import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvenioComponent } from './pages/convenio/convenio.component';

const routes: Routes = [
  {
    path:'',
    component:ConvenioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConveniosRoutingModule { }
