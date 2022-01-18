import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Curso } from '../../models/curso';
import { AlumnoService } from '../../services/alumno.service';
import { CursoService } from '../../services/curso.service';
import { Alumno } from '../../models/alumno';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styles: [
  ]
})
export class AsignarAlumnosComponent implements OnInit {


  curso!:Curso;

  listaAlumnos:Alumno[]=[];
  listaAlumnosCurso:Alumno[]=[];

  mostrarColumnas:string[]=['seleccion','nombre','apellido'];
  mostrarColumnasAlumnos:string[]=['id','nombre','apellido','email','eliminar'];

  tabIndex:number=0

  seleccion:SelectionModel<Alumno>=new SelectionModel<Alumno>(true,[]);

  progressBarAlumnos:boolean=false;
  progressBarAsignar:boolean=false;

  /**
   * DataSource de alumnos
   */
  dataSource!:MatTableDataSource<Alumno>;
  /**
   * Cuando los datos del paginador son stasticos, no van al back-end
   */
  @ViewChild(MatPaginator,{static:true}) paginator!:MatPaginator;

  pageSizeOptions:number[]=[3,5,10,15,25];

  constructor(private router:ActivatedRoute,private alumnoService:AlumnoService,
    private cursoService:CursoService) { }

  ngOnInit(): void {

    this.router.paramMap.subscribe(params=>{
      const id:number = +params.get('id')!;

      this.cursoService.ver(id).subscribe(c=>{
        this.curso=c;
        this.listaAlumnosCurso=c.alumnos;
        this.llenarPaginador();
      });

    });

   
  }

  /**
   * Medoto para buscar los alumnos por carateres en el nombre
   * @param event 
   */
  buscarTermino(event:any):void{
    const nombre:string = event.target.value;
    
    if(nombre!=undefined && nombre !==''){
      this.alumnoService.filtrarPorNombre(nombre.trim()).subscribe(alumnos=>this.listaAlumnos=alumnos.filter(a=>{
        let filtrar=true;
        this.listaAlumnosCurso.forEach(ca=>{   
          if(a.id===ca.id){
            filtrar=false;
          }
        });
        return filtrar;
      }));
    }else{
      this.listaAlumnos=[];
    }

    

  }

  /**
   * MEtodo para saber si estan todos seleccionados
   * @returns 
   */
  estanTodosSeleccionados():boolean{
    const seleccionados=this.seleccion.selected.length;
    const numAlumnos= this.listaAlumnos.length;

    return (seleccionados===numAlumnos);
  }

  /**
   * Metodo para seleccionar todos
   */
  seleccionarTodos():void{

    this.estanTodosSeleccionados()?
    this.seleccion.clear():
    this.listaAlumnos.forEach(a=>this.seleccion.select(a));
  }

  /**
   * Asignar alunos al curso seleccionado
   */
  asignar():void{
    console.log(this.seleccion.selected);
    this.progressBarAsignar=true;
    this.cursoService.asignarAlumno(this.curso,this.seleccion.selected).subscribe(curso=>{
      this.progressBarAsignar=false;
      //Para que se vaya al tap a la tabla de los alumnos asignados
      this.tabIndex=2;
      Swal.fire('Asignados',`Alumnos asignados con exito al curso ${curso.nombre} `,'success');
      //Para refrescar la lista de los alumnos del curso, angular es reactivo y en automatico hace el cambio
      this.listaAlumnosCurso= this.listaAlumnosCurso.concat(this.seleccion.selected);
      this.seleccion.clear();
      this.listaAlumnos=[];
      this.llenarPaginador();

    },err =>{
      this.progressBarAsignar=false;
      if(err.status===500){
        const mensaje= err.error.message as string;
        if(mensaje.indexOf('ConstraintViolationException')>-1){

          Swal.fire('Cuidado','El alumno ya esta asociado a otro curso','error');

        }
      }
        
    });

  }


  /**
   * Metodo para eliminar el alumno
   * @param alumno 
   */
  eliminarAlumno(alumno:Alumno):void{

      Swal.fire({
        title: '¿Estas Seguro?',
        text: `¿Seguro que desea eliminar a ${alumno.nombre} ?`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.progressBarAlumnos=true;
          this.cursoService.eliminarAlumno(this.curso,alumno).subscribe(curso =>{
            this.listaAlumnosCurso=this.listaAlumnosCurso.filter(a=>a.id!==alumno.id);
            this.progressBarAlumnos=false;
            this.llenarPaginador();
            Swal.fire('Eliminado:',`Alumn@ eliminado con éxito del curso ${curso.nombre} `,'success');  
          },err=>{
            this.progressBarAlumnos=false;
            Swal.fire('Error:',`Hubo un error en el servidor`,'warning');  
          });
        
        }
         
      });
  }


  private llenarPaginador():void{
    this.dataSource= new MatTableDataSource<Alumno>(this.listaAlumnosCurso);
    this.dataSource.paginator=this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por página";
    this.paginator._intl.lastPageLabel='Ultima página';
    this.paginator._intl.nextPageLabel='Siguiente página';
    this.paginator._intl.previousPageLabel='Anterior página';
    this.paginator._intl.firstPageLabel='Primera página';
    
  }


}
