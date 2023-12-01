import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosEtapaService {
  private API_SERVIDOR ="http://localhost:8088/api/proyecto_etapa";
  constructor(
    private httpClient: HttpClient
  ) { }
  
  public getallProyectosEtapas():Observable<any>{
    return this.httpClient.get(`${this.API_SERVIDOR}/listarProyectoEtapas`)
  }
}
