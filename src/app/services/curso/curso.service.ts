import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private API_SERVIDOR = "http://localhost:8088/api/curso"

  constructor(
    private HttpClient : HttpClient
  ) { }

  public getAllCursos():Observable<any>{
    return this.HttpClient.get(`${this.API_SERVIDOR}/listarCursos`)
  }

}
