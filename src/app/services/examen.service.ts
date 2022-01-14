import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamenServiceextends extends  CommonService<Curso> {

  protected uri:string=environment.endPoint+'/examenes';
}
