import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { usuario } from '../../entidades/usuario';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private _usuarioService: UsuarioService, private _router: Router) {
    if(this._usuarioService.checkSession()){
      console.log('Usuario autenticado');
    }else{
      _router.navigate(['/login']);
    }
  }

  usuario:usuario = {
    uid: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    imagen: '',
    email: '',
    password: '',
  };

   ngOnInit(): void {
    this.obtenerUsuario();
  }

  async obtenerUsuario() {
    const usuario = await this._usuarioService.getUsuarioActual();
    if (usuario) {
      this.usuario = usuario;
      console.log("El usuario es ",usuario);
    }
  }

  logout() {
    this._usuarioService.logout();
    this._router.navigate(['/inicio']);
  }
}
