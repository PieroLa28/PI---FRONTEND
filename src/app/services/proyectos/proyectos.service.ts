import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private API_SERVIDOR ="http://localhost:8088/api/proyecto";
  constructor(
    private httpClient: HttpClient
  ) { }

  public getallProyectos():Observable<any>{
    return this.httpClient.get(`${this.API_SERVIDOR}/listarProyecto`)
  }

}
