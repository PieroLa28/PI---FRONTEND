import { Component, OnInit, inject } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { CursoService} from 'src/app/services/curso/curso.service';
import { GestionarProyectoService } from '../../services/gestionar-proyecto.service';
import { Proyecto } from 'src/app/core/models/proyecto';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import Swal from 'sweetalert2';
import { Curso_Proyecto } from 'src/app/core/models/inserrtCursoProyecto';


@Component({
  selector: 'app-gestionar-proyecto-add',
  templateUrl: './gestionar-proyecto-add.component.html',
  styleUrls: ['./gestionar-proyecto-add.component.css']
})
export class GestionarProyectoAddComponent implements OnInit{
  idProyecto:number=0
  dataEdit:Proyecto = new Proyecto()
  cursosMock:any[]=[]
  data:any[]=[]
  semestre:any[]=[];
  tipo_proyecto:any[]=[];
  cursosProyecto:Curso_Proyecto[]=[];
  facultad:any[]=[];
  escuelas:any[]=[];
  ciclo:any[]=[];
  url!:any
  file!:any
  imgRef!:any;
  cursos:any[]=[];
  _serviceGestionar = inject(GestionarProyectoService);
  constructor(
    public proyectosService: ProyectosService,
    private fb: FormBuilder,
    private stor:Storage,
    public cursoService : CursoService
  ){}

  ngOnInit(): void {
    this.cursoService.getAllCursos().subscribe(resp=>{
      this.cursos=resp;
      this.cursosMock= this.cursos
    })
    
    this._serviceGestionar.getSemestre().subscribe(resp=>{
      this.semestre=resp;
    })
    this._serviceGestionar.getTipoProyecto().subscribe(resp=>{
      this.tipo_proyecto=resp;
    })

    this._serviceGestionar.getFacultad().subscribe(resp=>{
      this.facultad=resp;
    })
    this._serviceGestionar.getEscuelas().subscribe(resp=>{
      this.escuelas=resp;
    })
    this._serviceGestionar.getCiclo().subscribe(resp=>{
      this.ciclo=resp;
    })
   
  }

  selectCiclo(event:Event){
    this.cursos = this.cursosMock
    const input = event.target as HTMLInputElement
    const value = input.value
    this.cursos= this.cursos.filter(data => data.ciclo_c.numero == value)
  }

  selectFacultad(event:Event){
    this.cursos = this.cursosMock
    const input = event.target as HTMLInputElement
    const value = input.value
    this.cursos= this.cursos.filter(data => data.escuela_c.facultad.id == value)
  }

  selectEscuela(event:Event){
    this.cursos = this.cursosMock
    const input = event.target as HTMLInputElement
    const value = input.value
    this.cursos= this.cursos.filter(data => data.escuela_c.id == value)
  }


getCursoAlumno(id:number){
  console.log(this.cursosProyecto)
  if (id!=null) {
    this._serviceGestionar.getCursoProyecto(id).subscribe(data=>{
      this.cursosProyecto = data;
      this.cursosProyecto = this.cursosProyecto.map((curso:any) => this.convertirClavesAMinusculas(curso));
    })
  }else if(this.cursosProyecto.length>0){
    this.cursosProyecto= this.cursosProyecto
  }else{
    this.cursosProyecto = []
  }
}

CursoMock(data:any){
  console.log(data)
  let existeObjetoConId = this.cursosProyecto.some(curso => curso.curso ==data.id);
  if (existeObjetoConId) {
    console.log(data)
    this.cursosProyecto = this.cursosProyecto.filter(curso => curso.curso !== data.id);
    this.data = this.data.filter(curso => curso.id !== data.id);
    console.log(this.cursosProyecto)
    console.log(this.data)
  } else {
  let dataInsert = {
    curso: data.id,
    proyecto:0
  }
  this.cursosProyecto.push(dataInsert);
  this.data.push(data)
  console.log(this.cursosProyecto)
  console.log(this.data) 
}
}

estaEnProyecto(idCurso: number): boolean {
  console.log(this.cursosProyecto)
  console.log(idCurso)
  return this.cursosProyecto.some(c => c.curso == idCurso);
}

 convertirClavesAMinusculas(obj: any): any {
  const resultado: any = {};
  Object.keys(obj).forEach(key => {
    resultado[key.toLowerCase()] = obj[key];
  });
  return resultado;
}

  async uploadFile($event: any) {
    this.file = $event.target.files[0];
    this.imgRef = ref(this.stor, `archivosSubidos/${this.file.name}`);
    let urll = await this.insertDocument();
    this.dataEdit.perfilProyecto=urll;
  }

  semestreSelect(event:Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value);
    this.dataEdit.semestre = value;
  }

  tipoSelect(event:Event) {
    const input = event.target as HTMLInputElement;
    const value =  parseInt(input.value);
    this.dataEdit.tipoProyecto = value;
  }
   async insertDocument() {
    return new Promise((resolve, reject) => {
      uploadBytes(this.imgRef, this.file)
        .then(() => {
          const starsRef = ref(this.stor, `archivosSubidos/${this.file.name}`);
          getDownloadURL(starsRef).then((data) => {
            this.url = data;
            resolve(this.url);
            return;
          });
        })
        .catch((error) => console.log(error));
    });
  }

  inicializar(){
    this.dataEdit.id=0
    this.dataEdit.descripcion=''
    this.dataEdit.fechaInicio=''
    this.dataEdit.fechaFin=''
    this.dataEdit.localidad=''
    this.dataEdit.nombre=''
    this.dataEdit.codigo=''
    this.dataEdit.objetivo=''
    this.dataEdit.perfilProyecto=''
    this.dataEdit.poblacionBenef=''
    this.dataEdit.presupuesto=0
    this.dataEdit.semestre=''
    this.dataEdit.tipoProyecto=''
  }

  guardar(){

    Swal.fire({
      title: "Proyecto Agregado Correctamente",
      icon: "success"
    });
    
     this._serviceGestionar.insertProyecto(this.dataEdit).subscribe(resp=>{
        this.idProyecto = resp.id
        for (let i = 0; i < this.cursosProyecto.length; i++) {
          // Cambiar el valor de la propiedad en cada objeto
          this.cursosProyecto[i].proyecto = this.idProyecto;
        }
        console.log(this.cursosProyecto)
        for (let i = 0; i < this.cursosProyecto.length; i++) {
          // Cambiar el valor de la propiedad en cada objeto
          this._serviceGestionar.insertCursoProyecto(this.cursosProyecto[i]).subscribe(resp=>{
            console.log(resp)
            this.inicializar();
          })
        }
      })
  }
}
