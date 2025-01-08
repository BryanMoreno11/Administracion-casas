import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';
import { AdministrarComponent } from './componentes/administrar/administrar.component';

export const routes: Routes = [
    {
    path:'',
    component:InicioComponent,
    title:'Pagina Inicio',
    },
    {
      path:'detalles/:id',
      component:DetallesComponent,
      title:'Pagina detalle',
    },
    {
      path:'administrar',
      component:AdministrarComponent,
    }

];
export default routes;
