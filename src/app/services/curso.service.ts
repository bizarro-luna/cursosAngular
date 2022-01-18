import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso';
import { CommonService } from './common.service';
import { Alumno } from '../models/alumno';
import { Examen } from '../models/examen';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends CommonService<Curso> {

  protected uri:string=environment.endPoint+'/cursos';

  constructor(http:HttpClient ) {
    super(http);
   }


   /**
    * Asignar alumnos a un curso
    * @param curso 
    * @param alumnos 
    * @returns 
    */
   asignarAlumno(curso:Curso,alumnos:Alumno[]):Observable<Curso>{
     return this.http.put<Curso>(`${this.uri}/${curso.id}/asignar-alumnos`,alumnos,
     {headers:this.cabeceras});
   }

   /**
    * Eviar peticion para eliminar alumno del curso
    * @param curso 
    * @param alumno 
    * @returns 
    */
   eliminarAlumno(curso:Curso,alumno:Alumno):Observable<Curso>{

    return this.http.put<Curso>(`${this.uri}/${curso.id}/eliminar-alumno`,
      alumno,{headers:this.cabeceras});
   }


   /**
    * Enviar los examenes para que se asignes al curso al  back-end
    * @param curso 
    * @param examenes 
    * @returns 
    */
   asignarExamenes(curso:Curso,examenes:Examen[]):Observable<Curso>{
     return this.http.put<Curso>(`${this.uri}/${curso.id}/asignar-examenes`,examenes,
     {headers:this.cabeceras});
   }

   /**
    * Eliminar el examen del curso
    * @param curso 
    * @param examen 
    * @returns 
    */
   eliminarExamen(curso:Curso,examen:Examen):Observable<Curso>{
    return this.http.put<Curso>(`${this.uri}/${curso.id}/eliminar-examen`,
    examen,{headers:this.cabeceras});
  }


  /**
   * Obtener el curso al que pertenece el alumno por medio del id
   * @param alumno 
   * @returns 
   */
  obtenerCursoPorAlumnoId(alumno:Alumno):Observable<Curso>{
    return this.http.get<Curso>(`${this.uri}/alumno/${alumno.id}`);
  }




}
