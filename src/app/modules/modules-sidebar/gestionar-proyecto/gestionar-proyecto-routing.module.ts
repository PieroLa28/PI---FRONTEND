import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarProyectoListComponent } from './pages/gestionar-proyecto-list/gestionar-proyecto-list.component';
import { GestionarProyectoEditComponent } from './pages/gestionar-proyecto-edit/gestionar-proyecto-edit.component';
import { GestionarProyectoAddComponent } from './pages/gestionar-proyecto-add/gestionar-proyecto-add.component';

const routes: Routes = [
  {
    path:'list',
    component:GestionarProyectoListComponent
  },
  {
    path:'edit',
    component: GestionarProyectoEditComponent
  },
  {
    path:'add',
    component: GestionarProyectoAddComponent
  },
  {
    path:'**',
    redirectTo:'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionarProyectoRoutingModule { }
