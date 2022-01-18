import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asignatura } from '../models/asignatura';
import { Examen } from '../models/examen';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends  CommonService<Examen> {

  protected uri:string=environment.endPoint+'/examenes';


  constructor(http:HttpClient ) {
    super(http);
   }

   /**
    * Obtener las asignaturas en la api
    * @returns 
    */
   obtenerAsignaturas():Observable<Asignatura[]>{

      return this.http.get<Asignatura[]>(`${this.uri}/asignaturas`);

   }


   /**
    * Buscar examen por nombre o por caracteres
    * @param term 
    * @returns 
    */
   filtrarTerExamen(term:string):Observable<Examen[]>{

    return this.http.get<Examen[]>(`${this.uri}/filtrar/${term}`);

   }



}
