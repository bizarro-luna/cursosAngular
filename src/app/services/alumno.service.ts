import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alumno } from '../models/alumno';
import { CommonService } from './common.service';



@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends CommonService<Alumno> {

  protected uri:string=environment.endPoint+'/alumnos';
  

  constructor(http:HttpClient ) {
    super(http);
   }

   /**
    * Metodo para crear con foto
    * @param alumno 
    * @param archivo 
    * @returns 
    */
   crearConFoto(alumno:Alumno,archivo:File):Observable<Alumno>{
    
      //Clase de javascript
      const formData= new FormData();

      formData.append('archivo',archivo);
      formData.append('nombre',alumno.nombre);
      formData.append('apellido',alumno.apellido!);
      formData.append('email',alumno.email!);
     
      return this.http.post<Alumno>(`${this.uri}/crear-con-foto`,formData);
   }


   editarConFoto(alumno:Alumno,archivo:File):Observable<Alumno>{
    
    //Clase de javascript
    const formData= new FormData();
    
    formData.append('nombre',alumno.nombre);
    formData.append('apellido',alumno.apellido!);
    formData.append('email',alumno.email!);
    formData.append('archivo',archivo);
   
    return this.http.put<Alumno>(`${this.uri}/editar-con-foto/${alumno.id}`,formData);
 }





  

}
