import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionarProyectoService {
  public URLSEMESTRE:string = 'http://localhost:8088/api/semestre'
  public URLTIPOPROYECTO:string = 'http://localhost:8088/api/tipo_proyecto'
  public URLCURSOPROYECTO:string = 'http://localhost:8088/api/curso/listarCursosProyecto/'
  public URLFACULTAD:string = 'http://localhost:8088/api/facultad/listarFacultad'
  public URLESCUELAS:string = 'http://localhost:8088/api/escuela/listarEscuelas'
  public URLCICLO:string = 'http://localhost:8088/api/ciclo/listarCiclo'
  public URLPROYECTOINSERT:string = 'http://localhost:8088/api/proyecto/insertarProyecto'
  public URLPROYECTODELETE:string = 'http://localhost:8088/api/proyecto/eliminarProyecto/'
  public URLPROYECCURSOPROYECTOINSERT:string = 'http://localhost:8088/api/curso_proyecto/insertarCursoProyecto'
  public URLPROYECCURSOPROYECTOUPDATE:string = 'http://localhost:8088/api/proyecto/editarProyecto/'
  public URLPROYECCURSOPROYECTODELETE:string = 'http://localhost:8088/api/curso_proyecto/eliminarCursoProyecto/'


  public editData:BehaviorSubject<any> = new BehaviorSubject(null);


  constructor(private http:HttpClient) { }

  getSemestre():Observable<any>{
    return this.http.get(this.URLSEMESTRE+"/listarSemestre");
  }

  getTipoProyecto():Observable<any>{
    return this.http.get(this.URLTIPOPROYECTO+"/listarTipo_proyecto");
  }

  getCursoProyecto(id:number):Observable<any>{
    return this.http.get(this.URLCURSOPROYECTO+id);
  }

  getFacultad():Observable<any>{
    return this.http.get(this.URLFACULTAD);
  }
  getEscuelas():Observable<any>{
    return this.http.get(this.URLESCUELAS);
  }
  getCiclo():Observable<any>{
    return this.http.get(this.URLCICLO);
  }

  insertProyecto(data:any):Observable<any>{
    return this.http.post(this.URLPROYECTOINSERT,data);
  }

  updateProyecto(id:number,data:any):Observable<any>{
    delete data.id;
    console.log(data)
    return this.http.put(this.URLPROYECCURSOPROYECTOUPDATE+id,data);
  }
  insertCursoProyecto(data:any):Observable<any>{
    return this.http.post(this.URLPROYECCURSOPROYECTOINSERT,data);
  }
  deleteProyecto(id:number):Observable<any>{
    return this.http.delete(this.URLPROYECTODELETE+id);
  }

  deleteCursoProyecto(id:any):Observable<any>{
    return this.http.delete(this.URLPROYECCURSOPROYECTODELETE+id);
  }
}

