import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { CommonListarComponent } from '../common-listar.component';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent extends CommonListarComponent<Curso,CursoService> implements OnInit {


  

  constructor(cursoService:CursoService) { 
    super(cursoService);
    this.titulo="Listado de Cursos";
    this.nombreModel=Curso.name;
  }

  
}
