import { Directive, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonService } from '../services/common.service';
import { Generic } from '../models/generic';


@Directive()
export abstract class CommonListarComponent <E extends Generic,S extends CommonService<E> > implements OnInit {


  titulo!:string;

  protected nombreModel!:string;

  

  /**
   * Lista de alumnos
   */
  lista:E[]=[];

  /**
   * Variables del paginator
   */
  totalRegistros:number=0;
  paginaActual:number=0;
  totalPorPagina:number=2;
  pageSizeOptions:number[]=[2,4,8,12,16,20,100];

  @ViewChild(MatPaginator)  paginator!:MatPaginator;

  constructor(protected service:S) { }

  ngOnInit(): void {

     this.paginador();
    //this.alumnoService.listar().subscribe(alumnos=> this.listaAlumnos= alumnos);

  }

  paginar(event:PageEvent):void{
    
    this.paginaActual=event.pageIndex;
    this.totalPorPagina=event.pageSize;
    this.paginador();

  }


  /**
   * Eliminar un alumno 
   * @param e 
   */
  eliminar(e:E):void{

    Swal.fire({
      title: '¿Estas Seguro?',
      text: `¿Seguro que desea eliminar a ${e.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(e.id!).subscribe(()=>{
          //Para actualizar la lista sin tener que ir al bacend hacer la peticion
          //this.listaAlumnos=this.listaAlumnos.filter(a=>a!==alumno);
          this.paginador();
          Swal.fire('Eliminado',`${this.nombreModel} ${e.nombre} eliminado con éxito`,'success')
        });
      }
    });

    }  

    /**
     * Metodo para el paginator
     */
    paginador(){
      this.service.listarPaginado(this.paginaActual.toString(),this.totalPorPagina.toString()).subscribe(p=>{
  
        this.lista=p.content as E[];
        this.totalRegistros=p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel="Registros por página";
        this.paginator._intl.lastPageLabel='Ultima página';
        this.paginator._intl.nextPageLabel='Siguiente página';
        this.paginator._intl.previousPageLabel='Anterior página';
        this.paginator._intl.firstPageLabel='Primera página';
  
      });
    }



   /* if(confirm(`¿Seguro que desea eliminar a ${alumno.nombre} ?`)){
      //cuando es un metodo void nada mas se pone parentisis vacio
      this.alumnoService.eliminar(alumno.id!).subscribe(()=>{
        //Para actualizar la lista sin tener que ir al bacend hacer la peticion
        this.listaAlumnos=this.listaAlumnos.filter(a=>a!==alumno);
        Swal.fire('Eliminado',`Alumno ${alumno.nombre} eliminado con éxito`,'success')
      });
  
    }*/


   
  

}
