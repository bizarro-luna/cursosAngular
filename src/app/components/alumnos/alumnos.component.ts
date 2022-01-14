import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from '../../models/alumno';
import { CommonListarComponent } from '../common-listar.component';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent extends CommonListarComponent<Alumno,AlumnoService> implements OnInit {


  
   uriImagen:string=environment.endPoint+'/alumnos/uploads/img/';

  constructor(service:AlumnoService){
    super(service);
    this.titulo='Lista de Alumnos';

    this.nombreModel=Alumno.name;
  }

 

 

   
  

}
