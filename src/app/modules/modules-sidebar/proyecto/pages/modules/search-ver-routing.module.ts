import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchVerComponent } from './home/search-ver/search-ver.component';

const routes: Routes = [
  {
    path:'',
    component:SearchVerComponent,
  },
  {
    path:'**',
    redirectTo:'',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchVerRoutingModule { }
