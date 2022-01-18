import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { CursosComponent } from './cursos/cursos.component';
import { ExamenesComponent } from './examenes/examenes.component';
import { AlumnosFormComponent } from './alumnos/alumnos-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CursosFormComponent } from './cursos/cursos-form.component';
import { ExamenesFormComponent } from './examenes/examenes-form.component';
import { AsignarAlumnosComponent } from './cursos/asignar-alumnos.component';


import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { AsignarExamenesComponent } from './cursos/asignar-examenes.component';
import { ResponderExamenComponent } from './alumnos/responder-examen.component';
import { ResponderExamenModalComponent } from './alumnos/responder-examen-modal.component';
import { VerExamenModalComponent } from './alumnos/ver-examen-modal.component';






@NgModule({
  declarations: [
    AlumnosComponent,
    CursosComponent,
    ExamenesComponent,
    AlumnosFormComponent,
    CursosFormComponent,
    ExamenesFormComponent,
    AsignarAlumnosComponent,
    AsignarExamenesComponent,
    ResponderExamenComponent,
    ResponderExamenModalComponent,
    VerExamenModalComponent
  ],
  entryComponents:[
    ResponderExamenModalComponent,
    VerExamenModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class ComponentsModule { }
