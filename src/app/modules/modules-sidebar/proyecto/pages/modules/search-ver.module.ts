import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchVerRoutingModule } from './search-ver-routing.module';
import { SearchVerComponent } from './home/search-ver/search-ver.component';


@NgModule({
  declarations: [
    SearchVerComponent
  ],
  imports: [
    CommonModule,
    SearchVerRoutingModule
  ]
})
export class SearchVerModule { }
