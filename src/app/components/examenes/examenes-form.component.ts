import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../services/examen.service';
import { CommonFormComponent } from '../common-form.component';
import { Examen } from '../../models/examen';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from '../../models/asignatura';
import { Pregunta } from 'src/app/models/pregunta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examenes-form',
  templateUrl: './examenes-form.component.html',
  styles: [
  ]
})
export class ExamenesFormComponent extends CommonFormComponent<Examen,ExamenService> implements OnInit {


  asignaturasPadre:Asignatura[]=[];
  asignaturasHija:Asignatura[]=[];

  errorPreguntas:string='';
 

  constructor(examenService:ExamenService,router:Router,
    activated:ActivatedRoute ) {
    super(examenService,router,activated);
    this.titulo='Crear Examen';
    this.entity=new Examen();
    this.redirect='/examenes';
    this.nombreModel=Examen.name;
   }

   ngOnInit(): void {

    this.activated.paramMap.subscribe(params =>{
      //El signo de admiracion es por si viene nulo alguna variable que confie que si va a ver un valor
      const id:number= +params.get('id')!;
      if(id){
        this.service.ver(id).subscribe(entity=> {
          this.entity=entity;
          this.titulo='Editar '+this.nombreModel; 

         /* this.service.obtenerAsignaturas().subscribe( asignaturas=>{
            this.asignaturasHija= asignaturas
            .filter( a=> a.padre && a.padre.id===this.entity.asignaturaPadre?.id );
          });*/
          this.cagarHijos();


        });
      }
    });

    this.service.obtenerAsignaturas()
    .subscribe( asignaturas => this.asignaturasPadre=asignaturas.filter(a=>!a.padre));

  }

  /**
   * Metodo para crear el examen;
   */
   crear():void{
     this.progressBar=true;
     if(this.entity.preguntas.length===0){
       //Swal.fire('Error Preguntas','Examen debe tener preguntas','error')
       this.errorPreguntas= 'Examen debe tener preguntas';
       this.progressBar=false;
       return;
     }
     this.errorPreguntas=undefined!;
     this.eliminarPreguntasVacias();
    super.crear();
    this.progressBar=false;
  }

  editar():void{
    this.progressBar=true;
    if(this.entity.preguntas.length===0){
      //Swal.fire('Error Preguntas','Examen debe tener preguntas','error')
      this.errorPreguntas= 'Examen debe tener preguntas';
      this.progressBar=false;
      return;
    }
    this.errorPreguntas=undefined!;
    this.eliminarPreguntasVacias();
   super.editar();
   this.progressBar=false;
}



  /**
   * Cargar las asignaturas en el combo hijos
   */
  cagarHijos():void{
  
      this.asignaturasHija=this.entity.asignaturaPadre?this.entity.asignaturaPadre.hijos:[];

  }



  /**
   * Comparar dos objetos de tipo asignatura
   * @param a1 a
   * @param a2 
   * @returns 
   */
  compararAsignatura(a1:Asignatura, a2:Asignatura): boolean{

    if(a1===undefined && a2===undefined){
      return true;
    }


    return a1 === null || a2===null || a1===undefined || a2===undefined?false:a1.id===a2.id;

    
  }


  /**
   * Agregar una pregunta 
   */
  agregarPregunta():void{
    
    this.entity.preguntas.push(new Pregunta());

  }


  /**
   * Asignar un texto
   * @param pregunta 
   * @param event 
   */
  asignarTexto(pregunta:Pregunta,event:any):void{

    pregunta.texto= event?.target.value as string;
    console.log(this.entity);

  }

  /**
   * eliminar una pregunta de la lista filtrando por el texto
   * @param pregunta 
   */
  eliminarPregunta(pregunta:Pregunta):void{

    this.entity.preguntas= this.entity.preguntas.filter(p=> pregunta.texto!==p.texto);

  }

  eliminarPreguntasVacias():void{

    this.entity.preguntas= this.entity.preguntas.filter(p => p.texto!=null && p.texto.length>0);

  }




}
