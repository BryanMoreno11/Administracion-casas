import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { usuario } from '../../entidades/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLogin: boolean = false;

  user:usuario = {
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: '',
    imagen: '',
    uid: ''
  };

  constructor(private _usuarioService: UsuarioService) {
    
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.reiniciarUsuario();
  }

  async register() {
   await this._usuarioService.register(this.user);
   this.reiniciarUsuario();
  }

  reiniciarUsuario() {
    this.user = {
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      password: '',
      imagen: '',
      uid: ''
    };
  }

  async login() {
    await this._usuarioService.login(this.user.email, this.user.password);
    this.reiniciarUsuario();
  }

}
