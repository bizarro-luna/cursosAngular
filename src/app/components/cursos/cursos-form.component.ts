import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CommonFormComponent } from '../common-form.component';
import { CursoService } from '../../services/curso.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styles: [
  ]
})
export class CursosFormComponent extends CommonFormComponent<Curso,CursoService> implements OnInit {

  constructor(cursoService:CursoService,router:Router,
    activated:ActivatedRoute ) {
    super(cursoService,router,activated);
    this.titulo='Crear Curso';
    this.entity=new Curso();
    this.redirect='/cursos';
    this.nombreModel=Curso.name;
   }

  

}
