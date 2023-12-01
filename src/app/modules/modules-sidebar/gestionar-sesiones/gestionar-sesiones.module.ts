import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarSesionesRoutingModule } from './gestionar-sesiones-routing.module';
import { ProyectosCreadosComponent } from './pages/proyectos-creados/proyectos-creados.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProyectosCreadosComponent
  ],
  imports: [
    CommonModule,
    GestionarSesionesRoutingModule,
    ReactiveFormsModule
  ]
})
export class GestionarSesionesModule { }
