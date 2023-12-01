import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Persona } from 'src/app/core/models/persona';

@Component({
  selector: 'app-form-proyecto',
  templateUrl: './form-proyecto.component.html',
  styleUrls: ['./form-proyecto.component.css']
})
export class FormProyectoComponent implements OnInit {
  usuario!: Persona;
  formGroup: FormGroup = new FormGroup({});
  matcher = new MyErrorStateMatcher();
  hide:boolean = true;
  optionsCarrera: any[] = [
    { name: 'Ingenieria de Sistemas' },
    { name: 'Contabilidad' },
    { name: 'Administracion' }
  ];
  filteredOptionsCarrera?: Observable<any[]>;

  optionsCiclo: any[] = [
    { ciclo: 'I' },
    { ciclo: 'II' },
    { ciclo: 'III' },
    { ciclo: 'IV' },
    { ciclo: 'V' },
    { ciclo: 'VI' }
  ];
  filteredOptionsCiclo?: Observable<any[]>;

  ngOnInit() {
    this.inithiliazerInputs();
    this.searchCarrera();
    this.searchCiclo();
  }

  private _filterCarrera(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.optionsCarrera.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterCiclo(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.optionsCiclo.filter(option => option.ciclo.toLowerCase().includes(filterValue));
  }

  public searchCarrera() {
    this.filteredOptionsCarrera = this.formGroup.get('carrera')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterCarrera(name as string) : this.optionsCarrera.slice();
      })
    );
  }

  public searchCiclo() {
    this.filteredOptionsCiclo = this.formGroup.get('ciclo')?.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.ciclo;
        return name ? this._filterCiclo(name as string) : this.optionsCiclo.slice();
      })
    );
  }

  public displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  public displayFn2(user: any): string {
    return user && user.ciclo ? user.ciclo : '';
  }

  public inithiliazerInputs() {
    this.usuario = new Persona();
    this.formGroup = new FormGroup({
      nombres: new FormControl(this.usuario.nombres, [Validators.required]),
      email: new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      apellidos: new FormControl(this.usuario.apellidos, [Validators.required]),
      codigo: new FormControl(this.usuario.codigo, [Validators.required]),
      dni: new FormControl(this.usuario.dni, [Validators.required]),
      carrera: new FormControl(this.usuario.carrera, [Validators.required]),
      ciclo: new FormControl(this.usuario.ciclo, [Validators.required]),
      username: new FormControl(this.usuario.username),
      password: new FormControl(this.usuario.password)
    });
  }

  public send(){
    console.log(this.formGroup.value)
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
