import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CommonFormComponent } from '../common-form.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styles: [
  ]
})
export class AlumnosFormComponent extends CommonFormComponent<Alumno,AlumnoService> implements OnInit {

 

  private fotoSeleccionada!:File;


  /**
   * Variable alumno en el formulario
   */
  alumno:Alumno= new Alumno();


  constructor( alumnoService:AlumnoService,  router:Router,
     activated:ActivatedRoute) {
        super(alumnoService,router,activated);
        this.titulo='Crear Alumnos';
        this.entity=new Alumno();
        this.redirect='/alumnos';
        this.nombreModel=Alumno.name;
  }


  seleccionarFoto(event:any):void{
    this.fotoSeleccionada=event.target.files[0];
    console.info(this.fotoSeleccionada);

    if(this.fotoSeleccionada.type.indexOf('image')<0){
      this.fotoSeleccionada=null!;
      Swal.fire(`Error seleccionar imagen`,`El archivo debe de ser de tipo imagen`,
            'error');
    }

  }



  /**
   * Metodo para crear el alumno;
   */
   crear():void{
    if(!this.fotoSeleccionada){
      super.crear(); 
    }
    else{
      this.progressBar=true;
      this.service.crearConFoto(this.entity,this.fotoSeleccionada).subscribe(alumno=>{
        console.log(alumno);
        Swal.fire('Nuevo:',`${this.nombreModel} ${alumno.nombre} creado con éxito`,'success');
        this.router.navigate([this.redirect]);
            },err =>{
        if(err.status===400){
          this.error=err.error;
          console.log(this.error);
        }
      });
      this.progressBar=false;

    }


  }

  /**
   * Metodo para crear el alumno;
   */
   editar():void{
    if(!this.fotoSeleccionada){
      super.editar();
    }
    else{
      this.progressBar=true;
      this.service.editarConFoto(this.entity,this.fotoSeleccionada).subscribe(alumno=>{
        console.log(alumno);
        Swal.fire('Modificado:',`${this.nombreModel} ${alumno.nombre} actualizado con éxito`,'success');
        this.router.navigate([this.redirect]);
            },err =>{
        if(err.status===400){
          this.error=err.error;
          console.log(this.error);
        }
      });
      this.progressBar=false;

    }


  }





  
  

}
