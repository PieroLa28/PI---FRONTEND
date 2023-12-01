import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeSidebarRoutingModule } from './home-sidebar-routing.module';
import { HomeSidebarComponent } from './home-sidebar/home-sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomeSidebarComponent
  ],
  imports: [
    CommonModule,
    HomeSidebarRoutingModule,
    SharedModule
  ]
})
export class HomeSidebarModule { }
