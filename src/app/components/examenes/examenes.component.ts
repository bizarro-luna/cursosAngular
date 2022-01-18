import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent extends CommonListarComponent<Examen,ExamenService> implements OnInit {

  constructor(examenService:ExamenService) { 
    super(examenService);
    this.titulo="Listado de Examenes";
    this.nombreModel=Examen.name;
  }

  

}
