import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive() 
export abstract class CommonFormComponent<E extends Generic,S extends CommonService<E>> implements OnInit {

  titulo:string='';

  /**
   * Variable alumno en el formulario
   */
  entity!:E;

  error:any;

  protected redirect:string="";

  protected nombreModel:string="";

  progressBar:boolean=false;


  constructor(protected service:S, protected router:Router,
    protected activated:ActivatedRoute) { }

  ngOnInit(): void {

    this.activated.paramMap.subscribe(params =>{
      //El signo de admiracion es por si viene nulo alguna variable que confie que si va a ver un valor
      const id:number= +params.get('id')!;
      if(id){
        this.service.ver(id).subscribe(entity=> {
          this.entity=entity;
          this.titulo='Editar '+this.nombreModel; 
        });
      }
    });

  }

 


  /**
   * Metodo para crear el alumno;
   */
  crear():void{
    this.progressBar=true;
    this.service.crear(this.entity).subscribe(e=>{
        console.log(e);
        Swal.fire('Nuevo:',`${this.nombreModel} ${e.nombre} creado con éxito`,'success');
        this.router.navigate([this.redirect]);
    },err =>{
      if(err.status===400){
        this.error=err.error;
        console.log(this.error);
      }
      this.progressBar=false;
    });
  }


  editar():void{
    this.progressBar=true;
      this.service.editar(this.entity).subscribe(e=>{
        console.log(e);
        Swal.fire('Modificado:',`${this.nombreModel} ${e.nombre} modificado con éxito`,'success');
        this.router.navigate([this.redirect]);
    },err =>{
      if(err.status===400){
        this.error=err.error;
        console.log(this.error);
      }
    });
    this.progressBar=true;
  }
  

}
