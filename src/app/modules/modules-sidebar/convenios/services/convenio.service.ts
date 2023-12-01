import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/core/models/persona';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
  public URL:string = 'http://localhost:9090/api/persona'
  constructor(private http:HttpClient) {

  }

  public getAllPersona():Observable<any>{
    return this.http.get(`${this.URL}/all`)
  }


}
