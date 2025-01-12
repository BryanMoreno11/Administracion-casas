import { Component } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { usuario } from '../../entidades/usuario';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './administrar-usuario.component.html',
  styleUrl: './administrar-usuario.component.css'
})
export class AdministrarUsuarioComponent {


  usuarios: usuario[] = [];
  usuarioActual: usuario = this.nuevoUsuario();
  isUserFormOpen = false;
  editing = false;
  usuarioAuth: usuario = {
    uid: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    imagen: '',
    email: '',
    password: '',
  }

  constructor(private usuarioService: UsuarioService, private route:Router ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.obtenerUsuarioAuth();
    
  }

  async obtenerUsuarioAuth() {
    const usuario = await this.usuarioService.getUsuarioActual();
    if (usuario) {
      this.usuarioAuth = usuario;
      console.log("El usuario es ",usuario);
    }
  }

  async cargarUsuarios() {
    this.usuarios = await this.usuarioService.getUsuarios();
    console.log("Los usuarios son ", this.usuarios);
  }

  nuevoUsuario(): usuario {
    return { nombres: '', apellidos: '', telefono: '', email: '', password: '', uid:'' };
  }

  abrirFormulario(usuario?: usuario) {
    this.isUserFormOpen = true;
    if (usuario) {
      this.usuarioActual = { ...usuario };
      this.editing = true;
    } else {
      this.usuarioActual = this.nuevoUsuario();
      this.editing = false;
    }
  }

  cerrarFormulario() {
    this.isUserFormOpen = false;
    this.usuarioActual = this.nuevoUsuario();
    this.usuarioService.loginUsuario(this.usuarioAuth.email, this.usuarioAuth.password);
  }

  async guardarUsuario() {
    if (this.editing) {
      await this.usuarioService.updateUsuario(this.usuarioActual.uid, this.usuarioActual);
     
    } else {
      await this.usuarioService.register(this.usuarioActual);
    }
    this.cerrarFormulario();
    this.cargarUsuarios();
  }

  eliminarUsuario(usuario: usuario) {
    this.usuarioService.loginUsuario(usuario.email, usuario.password).then(() => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.deleteUsuario(usuario.uid).then(() => {
            Swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado correctamente.',
              'success'
            );
            
            this.usuarioService.loginUsuario(this.usuarioAuth.email, this.usuarioAuth.password).then(() => {
              this.cargarUsuarios();
  
              // Si el usuario eliminado es el usuario autenticado
              if (usuario.uid === this.usuarioAuth.uid) {
                this.usuarioService.logout();
                this.route.navigate(['/login']);
              }
            });
          }).catch((error) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el usuario.',
              'error'
            );
          });
        } else {
          // Si el usuario cancela la acción, volvemos a iniciar sesión con el usuario autenticado
          this.usuarioService.loginUsuario(this.usuarioAuth.email, this.usuarioAuth.password);
        }
      });
    }).catch((error) => {
      Swal.fire(
        'Error',
        'Hubo un problema al iniciar sesión con el usuario.',
        'error'
      );
    });
  }

  editarUsuario(usuario: usuario) {
    this.usuarioService.loginUsuario(usuario.email, usuario.password);
    this.abrirFormulario(usuario);
  }

}
