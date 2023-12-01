import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ConveniosRoutingModule } from './convenios-routing.module';
import { ConvenioComponent } from './pages/convenio/convenio.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    ConvenioComponent
  ],
  imports: [
    CommonModule,
    ConveniosRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
  ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ConveniosModule { }
