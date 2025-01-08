import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InicioComponent } from "./componentes/inicio/inicio.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <main>
      
        <header class="brand-name">
        <a [routerLink]="['/']">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">

        </a>
        <button  class="btn-admin" routerLink="administrar">Administrar</button>

          </header>
      
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink]
})
export class AppComponent {
  title = 'SistemaGuiaAngularEspanol';

  
}

