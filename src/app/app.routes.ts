import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';
import { AdministrarComponent } from './componentes/administrar/administrar.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { AdministrarUsuarioComponent } from './componentes/administrar-usuario/administrar-usuario.component';

export const routes: Routes = [
    {
    path:'inicio',
    component:InicioComponent,
    title:'Pagina Inicio',
    },
    {
      path:'detalles/:id',
      component:DetallesComponent,
      title:'Pagina detalle',
    },
    {
      path:'login',
      component:LoginComponent
    },
    { path: 'dashboard', component: DashboardComponent, children: [
      { path: 'casas', component: AdministrarComponent },
      { path: 'usuarios', component: AdministrarUsuarioComponent },
      
    ] },

    { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
];
export default routes;
