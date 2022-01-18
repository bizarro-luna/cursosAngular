import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Examen } from '../../models/examen';
import { Alumno } from '../../models/alumno';
import { Curso } from '../../models/curso';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-responder-examen-modal',
  templateUrl: './responder-examen-modal.component.html',
  styles: [
  ]
})
export class ResponderExamenModalComponent implements OnInit {

  curso!:Curso; 
  alumno!:Alumno; 
  examen!:Examen;

  /**
   * el resultado que se envia cuando se cierra el dialogo
   *    number:id de la pregunta
   *    Respuesta:Respuesta a la pregunta
   */
  respuestas:Map<number,Respuesta>=new Map<number,Respuesta>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef:MatDialogRef<ResponderExamenModalComponent>) { }

  ngOnInit(): void {
    this.curso= this.data.curso as Curso;
    this.alumno= this.data.alumno as Alumno;
    this.examen=this.data.examen as Examen;
  }



  responder(pregunta:Pregunta,event:any):void{
    const texto= event.target.value as string;
    const respuesta= new Respuesta();
    respuesta.alumno=this.alumno;
    respuesta.pregunta=pregunta
    //PAra evitar el ciclado recursivo
    const examen:Examen= new Examen;
    //Lo que interesa es e id del examen
    examen.id= this.examen.id;
    examen.nombre= this.examen.nombre;
    respuesta.pregunta.examen=examen;
    respuesta.texto= texto;

    this.respuestas.set(pregunta.id!,respuesta);
    //console.log(this.respuestas);

  }


  cancelar():void{

  }

}
