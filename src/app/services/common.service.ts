import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';



/**
 * Clase abstracta para solo se pueda heredar no instanciar Generica
 */
export abstract class CommonService<E extends Generic> {

  
  protected uri!:string;

  protected cabeceras:HttpHeaders=new HttpHeaders(
    {'Content-Type':'application/json'}
  );

  constructor(protected http:HttpClient ) { }


  /**
   * 
   * @returns 
   */
  listar():Observable<E[]>{
    return this.http.get<E[]>(this.uri);
  }

  /**
   * 
   * @param page 
   * @param size 
   * @returns 
   */
  listarPaginado(page:string,size:string):Observable<any>{
    /// para hacer esto alumnos/pagina?page=0&size=6
    const params = new HttpParams().set('page',page)
                                   .set('size',size);
    return this.http.get<any>(`${this.uri}/pagina`,{params:  params});
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  ver(id:number):Observable<E>{
    return this.http.get<E>(`${this.uri}/${id}`);
  }

  /**
   * 
   * @param alumno 
   * @returns 
   */
  crear(e:E):Observable<E>{
    return this.http.post<E>(this.uri,e,{ headers:this.cabeceras});
  }

  /**
   * 
   * @param alumno 
   * @returns 
   */
   editar(e:E):Observable<E>{
    return this.http.put<E>(`${this.uri}/${e.id}`,e,{ headers:this.cabeceras});
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  eliminar(id:number):Observable<void>{
    return this.http.delete<void>(`${this.uri}/${id}`)
  }



  

}
