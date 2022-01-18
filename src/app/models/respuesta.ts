
import { Alumno } from './alumno';
import { Pregunta } from './pregunta';
import { Examen } from './examen';
export class Respuesta {

    id!:string;
    texto!:string;
    alumno!:Alumno;
    pregunta!:Pregunta;
}
