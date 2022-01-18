import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../services/alumno.service';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso';
import { Examen } from '../../models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import { FormControl, FormControlName } from '@angular/forms';
import {map,flatMap} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-asignar-examenes',
  templateUrl: './asignar-examenes.component.html',
  styles: [
  ]
})
export class AsignarExamenesComponent implements OnInit {


  curso!:Curso;
  examenesCurso:Examen[]=[];
  examenesFiltrado:Examen[]=[];
  examenesAsignados:Examen[]=[];

  progressBar:boolean=false;

  terminoExamen!:string;

  autoCompleteControl=new FormControl;

  mostrarColumnas:string[]=['nombre','asignatura','eliminar'];
  mostrarColumnasExamenes:string[]=['id','nombre','asignaturas','eliminar'];

  tabIndex:number=0;

  /**
   * DataSource de alumnos
   */
   dataSource!:MatTableDataSource<Examen>;
   /**
    * Cuando los datos del paginador son stasticos, no van al back-end
    */
   @ViewChild(MatPaginator,{static:true}) paginator!:MatPaginator;

   pageSizeOptions:number[]=[3,5,10,15,25];


  constructor(private router:ActivatedRoute,private alumnoService:AlumnoService,
    private cursoService:CursoService,private examenService:ExamenService) { }

  ngOnInit(): void {

    this.router.paramMap.subscribe(params=>{
      const id:number = +params.get('id')!;

      this.cursoService.ver(id).subscribe(c=>{
        this.curso=c;
        this.examenesCurso=c.examenes;
        this.llenarPaginador();
      });

      this.autoCompleteControl.valueChanges.pipe(
        //El map es para cambiar el valor del flujo actual
        map(valor=> typeof valor==='string'?valor:valor.nombre),
        flatMap(valor=> valor?this.examenService.filtrarTerExamen(valor):[])
      ).subscribe(examenes=>this.examenesFiltrado=examenes);

    });
  }


  /**
   * Metodo para mostrar el nombre del examen al seleccionarlo
   * @param examen 
   * @returns 
   */
  mostrarNombreExamen(examen: Examen): string {
    return examen && examen.nombre ? examen.nombre : '';
  }

  /**
   * Examenes seleccionados
   * @param event 
   */
  seleccionarExamen(event:MatAutocompleteSelectedEvent):void{
    const examen= event.option.value as Examen;
    //Para refrescar la tabla de mat-table, no se puede con un push nobre el arreglo , se crea otra instancia

    if(!this.existe(examen.id)){
    
      this.examenesAsignados = this.examenesAsignados.concat(examen);
      
      console.log(this.examenesAsignados);
     
    }else{
      Swal.fire('Error',`El examen ${examen.nombre} ya se encuentra asignado al curso`,'error');
    }

    this.autoCompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
  }


  /**
   * Metodo para validar si existe en ya examenesSeleccionados y en los examenes ya existentes
   * @param id 
   * @returns 
   */
  private existe(id:number):boolean{
    let existe=false;
    this.examenesAsignados.concat(this.examenesCurso)
    .forEach(e=>{
      if(id===e.id){
        existe=true;
      }
    });

    return existe;
  }


  /**
   * Metodo para eliminar del ya asignado
   * @param examen 
   */
  eliminarDelAsignado(examen:Examen):void{
    this.examenesAsignados= this.examenesAsignados.filter(
      e=> examen.id!==examen.id
    );
  }



  /**
   * Enviar los datos al back end para que guarde los examnes
   */
   guardarExamenes():void{
    this.progressBar=true;
    this.cursoService.asignarExamenes(this.curso,this.examenesAsignados).subscribe(curso=>{
      //Contact para agregar la lista de examenes asiganados a las del curso
      this.examenesCurso=this.examenesCurso.concat(this.examenesAsignados);
      this.llenarPaginador();
      this.examenesAsignados=[];
      Swal.fire('Asignados',`Examenes asignados con éxito al curso ${curso.nombre}`,'success');
      this.tabIndex=2;
    });
    this.progressBar=false;
  }



  /**
   * Eliminar el examen
   * @param examen 
   */
  eliminarExamen(examen:Examen):void{

    Swal.fire({
      title: '¿Estas Seguro?',
      text: `¿Seguro que desea eliminar  ${examen.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.cursoService.eliminarExamen(this.curso,examen).subscribe(examen =>{
        this.examenesCurso=this.examenesCurso.filter(e=>e.id!==examen.id);    
          this.llenarPaginador();
          Swal.fire('Eliminado:',`Examen eliminado con éxito del curso ${examen.nombre} `,'success');  
        },err=>{
         
          Swal.fire('Error:',`Hubo un error en el servidor`,'warning');  
        });
      
      }
       
    });

  }

  private llenarPaginador():void{
    this.dataSource= new MatTableDataSource<Examen>(this.examenesCurso);
    this.dataSource.paginator=this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por página";
    this.paginator._intl.lastPageLabel='Ultima página';
    this.paginator._intl.nextPageLabel='Siguiente página';
    this.paginator._intl.previousPageLabel='Anterior página';
    this.paginator._intl.firstPageLabel='Primera página';
    
  }

 

}
