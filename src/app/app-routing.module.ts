import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosFormComponent } from './components/alumnos/alumnos-form.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CursosFormComponent } from './components/cursos/cursos-form.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ExamenesFormComponent } from './components/examenes/examenes-form.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { AsignarAlumnosComponent } from './components/cursos/asignar-alumnos.component';
import { AsignarExamenesComponent } from './components/cursos/asignar-examenes.component';
import { ResponderExamenComponent } from './components/alumnos/responder-examen.component';

const routes: Routes = [


  {path:'alumnos',component:AlumnosComponent },
  {path:'alumnos/form',component:AlumnosFormComponent },
  {path:'alumnos/form/:id',component:AlumnosFormComponent },
  {path:'alumnos/responder-examen/:id',component:ResponderExamenComponent },
  {path:'cursos',component:CursosComponent },
  {path:'cursos/form',component:CursosFormComponent },
  {path:'cursos/form/:id',component:CursosFormComponent },
  {path:'cursos/asignar-alumnos/:id',component:AsignarAlumnosComponent },
  {path:'cursos/asignar-examenes/:id',component:AsignarExamenesComponent },
  {path:'examenes',component:ExamenesComponent },
  {path:'examenes/form',component:ExamenesFormComponent },
  {path:'examenes/form/:id',component:ExamenesFormComponent },
  {path:'', pathMatch:'full',redirectTo:'cursos'}
  
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
