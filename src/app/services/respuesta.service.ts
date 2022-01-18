import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Respuesta } from '../models/respuesta';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examen } from '../models/examen';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private uri:string=environment.endPoint+'/respuestas';
  private cabeceras: HttpHeaders= new HttpHeaders({'Content-Type':'application/json'});


  constructor(private http:HttpClient) { }

  /**
   * Enviar las respuestas al back-end
   * @param respuestas 
   * @returns 
   */
  crear(respuestas:Respuesta[]):Observable<Respuesta[]>{

    return this.http.post<Respuesta[]>(this.uri,respuestas,{headers:this.cabeceras});

  }

  /**
   * Obtener respuestas del examen por alumno,examen
   * @param alumno 
   * @param examen 
   */
  obtenerRespuestaAlumnoExamen(alumno:Alumno,examen:Examen):Observable<Respuesta[]>{
     return  this.http.get<Respuesta[]>(`${this.uri}/alumno/${alumno.id}/examen/${examen.id}`)
  }


}
