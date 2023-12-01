import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosCreadosComponent } from './pages/proyectos-creados/proyectos-creados.component';

const routes: Routes = [
  {
    path:'proyectos-creados',
    component: ProyectosCreadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionarSesionesRoutingModule { }
