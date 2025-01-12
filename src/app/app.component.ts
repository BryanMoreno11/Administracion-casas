import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from './servicios/usuario.service';



@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <main>
    <router-outlet></router-outlet>
      <header class="brand-name">
      <a [routerLink]="['/']">
      <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">

      </a>
      <button  class="btn-admin" routerLink="/dashboard" >Administrar</button>

        </header>
    
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
  `
  
  
  ,
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink]
})
export class AppComponent {
  title = 'SistemaGuiaAngularEspanol';

  constructor(private router: Router, private _usuarioService: UsuarioService) {
    
  }

 

  
}

