import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CursosComponent } from './cursos/cursos.component';
import { ExamenesComponent } from './examenes/examenes.component';
import { AlumnosFormComponent } from './alumnos/alumnos-form.component';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    AlumnosComponent,
    CursosComponent,
    ExamenesComponent,
    AlumnosFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule
  ]
})
export class ComponentsModule { }
