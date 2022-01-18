import { Component, Inject, OnInit } from '@angular/core';
import { Respuesta } from '../../models/respuesta';
import { Curso } from '../../models/curso';
import { Examen } from '../../models/examen';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-examen-modal',
  templateUrl: './ver-examen-modal.component.html',
  styles: [
  ]
})
export class VerExamenModalComponent implements OnInit {


  curso!:Curso; 
  respuestas!:Respuesta[]; 
  examen!:Examen;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef:MatDialogRef<VerExamenModalComponent>) { }

  ngOnInit(): void {
    this.curso= this.data.curso as Curso;
    this.examen=this.data.examen as Examen;
    this.respuestas= this.data.respuestas as Respuesta[];

  }

  cerrar():void{
    this.modalRef.close();
  }

}
