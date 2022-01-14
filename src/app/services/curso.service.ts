import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Alumno } from '../models/alumno';
import { Curso } from '../models/curso';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso> {

  protected uri:string=environment.endPoint+'/cursos';
}
