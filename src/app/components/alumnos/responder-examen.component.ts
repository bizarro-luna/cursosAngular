import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';
import { Curso } from '../../models/curso';
import { Examen } from '../../models/examen';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ResponderExamenModalComponent } from './responder-examen-modal.component';
import { RespuestaService } from '../../services/respuesta.service';
import { Respuesta } from 'src/app/models/respuesta';
import Swal from 'sweetalert2';
import { VerExamenModalComponent } from './ver-examen-modal.component';

@Component({
  selector: 'app-responder-examen',
  templateUrl: './responder-examen.component.html',
  styles: [
  ]
})
export class ResponderExamenComponent implements OnInit {


  alumno!:Alumno;
  curso!:Curso;
  examenes:Examen[]=[];

  progressBar:boolean=false;


  mostrarColumnasExamenes:string[]=['id','nombre','asignaturas','preguntas','responder','ver']


  /**
   * DataSource de alumnos
   */
   dataSource!:MatTableDataSource<Examen>;
   /**
    * Cuando los datos del paginador son stasticos, no van al back-end
    */
   @ViewChild(MatPaginator,{static:true}) paginator!:MatPaginator;
 
   pageSizeOptions:number[]=[3,5,10,15,25];





  constructor(private route:ActivatedRoute, 
    private alumnoService:AlumnoService,
    private cursoService:CursoService,
    public dialog:MatDialog,
    private respuestaService:RespuestaService ) { }

  ngOnInit(): void {
    this.progressBar=true;
    this.route.paramMap.subscribe(params=>{
      const id:number= +params.get('id')!;
      this.alumnoService.ver(id).subscribe(alumno=>{
        this.alumno=alumno;

        this.cursoService.obtenerCursoPorAlumnoId(alumno).subscribe(curso=>{
            this.curso=curso;
            this.examenes=(curso && curso.examenes)?curso.examenes:[];
            this.initPaginador();
        });


      });

    });

    this.progressBar=false;

  }


  /**
   * Abrir la modal para responder el examen
   * @param examen 
   */
   responderExamen(examen:Examen):void{

    const modalRef =  this.dialog.open(ResponderExamenModalComponent,{ 
        width:'750px',
        data:{curso: this.curso, alumno: this.alumno, examen: examen}
      });

      modalRef.afterClosed().subscribe(respuestasMap=>{
        console.log('Se han enviado los datos y se ha cerrado la modal');
        console.log(respuestasMap);

        if(respuestasMap){
          //Convierte las respuestas del map en un arreglo
          const respuestas:Respuesta[]=Array.from(respuestasMap.values());

          this.respuestaService.crear(respuestas).subscribe(respuestas=>{
            examen.resuelto=true;
            Swal.fire('Enviadas:',`Preguntas enviadas con éxito `,'success');
            console.log(`Respuestas guardadas ${respuestas}`);
          });

        }

      },err=>{  
        Swal.fire('Error:',`Error en el servidor`,'error');
       } );

  }

  verExamenRespuestas(examen:Examen):void{

    this.respuestaService.obtenerRespuestaAlumnoExamen(this.alumno,examen).subscribe(rs=>{

      const modalRef =  this.dialog.open(VerExamenModalComponent,{ 
        width:'750px',
        data:{curso: this.curso, examen: examen,respuestas:rs}
      });

      modalRef.afterClosed().subscribe(()=>{
        console.log('Se ha cerrado Modal');
      

      });


    });


  }



  private initPaginador():void{
    this.dataSource= new MatTableDataSource<Examen>(this.examenes);
    this.dataSource.paginator=this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por página";
    this.paginator._intl.lastPageLabel='Ultima página';
    this.paginator._intl.nextPageLabel='Siguiente página';
    this.paginator._intl.previousPageLabel='Anterior página';
    this.paginator._intl.firstPageLabel='Primera página';
    
  }


  


}
