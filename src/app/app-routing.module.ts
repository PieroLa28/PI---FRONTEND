import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path:'auth',
    loadChildren: ()=>import('./modules/auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path:'modules',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path:'home/sidebar',
    loadChildren: () => import('./modules/modules-sidebar/home-sidebar/home-sidebar.module').then(m => m.HomeSidebarModule),
  },
  {
    path:'**',
    redirectTo:'auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
