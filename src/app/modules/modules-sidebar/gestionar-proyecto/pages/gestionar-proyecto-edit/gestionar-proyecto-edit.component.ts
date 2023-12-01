import { Component, OnInit, inject } from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { CursoService} from 'src/app/services/curso/curso.service';
import { GestionarProyectoService } from '../../services/gestionar-proyecto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/core/models/proyecto';
import { ProyectoEdit } from 'src/app/core/models/proyectoEdit';
import { Curso_Proyecto } from 'src/app/core/models/inserrtCursoProyecto';
import { Semestre } from 'src/app/core/models/semestre';
import { TipoProyecto } from 'src/app/core/models/tipoProyecto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-proyecto-edit',
  templateUrl: './gestionar-proyecto-edit.component.html',
  styleUrls: ['./gestionar-proyecto-edit.component.css']
})
export class GestionarProyectoEditComponent implements OnInit{
  dataEdit!:ProyectoEdit
  dataEditSave:Proyecto = new Proyecto()
  // formulario: FormGroup = new FormGroup(null);
  semestre:any[]=[];
  data:any[]=[]
  dataProyectoDelete:Curso_Proyecto[]=[]
  dataProyectoInsert:Curso_Proyecto[]=[]
  tipo_proyecto:any[]=[];
  cursosProyecto:any[]=[];
  cursosProyectoCopy:any[]=[];
  cursosProyectoCopy2:any[]=[];
  facultad:any[]=[];
  escuelas:any[]=[];
  ciclo:any[]=[];
  valueInput:number=0;
  valueInput2:number=0;
  url!:any
  file!:any
  imgRef!:any;
  cursos:any;
  _serviceGestionar = inject(GestionarProyectoService);
  constructor(
    private fb: FormBuilder,
    private stor:Storage,
    public cursoService : CursoService
  ){}
  semestreSelect(event:Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value);
    this.valueInput = value
    this.dataEditSave.semestre = value;
  }

  tipoSelect(event:Event) {
    const input = event.target as HTMLInputElement;
    const value =  parseInt(input.value);
    this.valueInput2 = value
    this.dataEditSave.tipoProyecto = value;
    console.log(this.dataEditSave.tipoProyecto)
  }

  ngOnInit(): void {
    this.cursoService.getAllCursos().subscribe(resp=>{
      this.cursos=resp;
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
    this._serviceGestionar.editData.subscribe(data =>{
     if (data!= null) {
      this.dataEdit = data;
      this.dataEdit.perfil_proyecto = data?.perfil_proyecto
      this.dataEdit.fechaInicio = data?.fecha_inicio
      this.dataEdit.fechaFin = data?.fecha_fin
      this.dataEdit.tipoProyecto = data?.tipo_proyecto
     }
    })
  }

getCursoAlumno(id:number){
  this._serviceGestionar.getCursoProyecto(id).subscribe(data=>{
    this.cursosProyecto = data;
    this.cursosProyecto = this.cursosProyecto.map((curso:any) => this.convertirClavesAMinusculas(curso));
     for (const iterator of this.cursosProyecto) {
       let mock = {
        id:iterator.id_curso_proyecto,
       curso: iterator.id,
         proyecto:this.dataEdit.id
       }
       console.log(mock)
      this.cursosProyectoCopy.push(mock)
      this.cursosProyectoCopy2 = this.cursosProyectoCopy
     }
  })
}

CursoMock(data:any){
  console.log("..............")
  console.log(data)
  let mock = {
    id:data.id_curso_proyecto,
    curso: data.id,
      proyecto:this.dataEdit.id
    }
    console.log(this.cursosProyectoCopy)
    let estaContenido = this.cursosProyectoCopy.some(objeto => objeto.curso === mock.curso);
  if (estaContenido) {
    const idExistente = this.dataProyectoDelete.some(item => item.curso == mock.curso);
  if (!idExistente) {
    this.dataProyectoDelete.push(mock);
  }
    this.cursosProyectoCopy=this.cursosProyectoCopy.filter(objeto => objeto.curso !== mock.curso);
    this.cursosProyecto=this.cursosProyecto.filter(objeto => objeto.id !== mock.curso);
  }else{
    const idExistente = this.dataProyectoInsert.some(item => item.curso == mock.curso);
  if (!idExistente) {
    this.dataProyectoInsert.push(mock);
  }
    this.cursosProyectoCopy.push(mock)
   this.cursosProyecto.push(data)
  }
  console.log("data insert",this.dataProyectoInsert)
  console.log("data delete",this.dataProyectoDelete)
  console.log("data proyecto cpy",this.cursosProyectoCopy2)
}

 toggleObjetoEnArray(array:any, objeto:any) {
  const indice = array.findIndex((item:any) => item.id === objeto.id);

  if (indice !== -1) {
    // Objeto encontrado, eliminarlo
    array.splice(indice, 1);
  } else {
    // Objeto no encontrado, agregarlo
    array.push(objeto);
  }
}
estaEnProyecto(idCurso: number): boolean {
  return this.cursosProyecto.some(c => c.id == idCurso);
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
    console.log(urll)
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

  editar(){
    console.log("---------")
   if (this.dataEdit != null) {
    for (const iterator of this.cursosProyectoCopy2) {
     for (const iterator2 of this.dataProyectoDelete) {
      if (iterator.curso ==  iterator2.curso && iterator.proyecto == iterator2.proyecto) {
        iterator2.id = iterator.id
      }
     }
    }
    if (this.valueInput == 0) {
      this.dataEditSave.semestre  = this.dataEdit.semestre.id
    }
    if (this.valueInput2 == 0) {
      this.dataEditSave.tipoProyecto  = this.dataEdit.tipoProyecto.id
    }
    console.log(this.dataProyectoDelete)
    this.dataEditSave.id = this.dataEdit.id
    this.dataEditSave.descripcion = this.dataEdit.descripcion
    this.dataEditSave.fechaInicio = this.dataEdit.fechaInicio
    this.dataEditSave.fechaFin = this.dataEdit.fechaFin
    this.dataEditSave.localidad = this.dataEdit.localidad
    this.dataEditSave.nombre = this.dataEdit.nombre
    this.dataEditSave.codigo = this.dataEdit.codigo
    this.dataEditSave.objetivo = this.dataEdit.objetivo
    this.dataEditSave.perfilProyecto = this.dataEdit.perfil_proyecto
    this.dataEditSave.poblacionBenef = this.dataEdit.poblacionBenef
    this.dataEditSave.presupuesto = this.dataEdit.presupuesto
    console.log(this.dataEditSave)
    this._serviceGestionar.updateProyecto(this.dataEdit.id,this.dataEditSave).subscribe(data=> {
      console.log(data)
       })
   }

   for (const iterator of this.dataProyectoDelete) {
    this._serviceGestionar.deleteCursoProyecto(iterator.id).subscribe(data=> {
      console.log(data)
       })
   }
   for (const iterator of this.dataProyectoInsert) {
    this._serviceGestionar.insertCursoProyecto(iterator).subscribe(data=> {
      console.log(data)
       })
   }
  Swal.fire({
    title: "Good job!",
    text: "You clicked the button!",
    icon: "success"
    });
   this.inicializar()
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
    this.dataEdit.perfil_proyecto=''
    this.dataEdit.poblacionBenef=''
    this.dataEdit.presupuesto=0
    this.dataEdit.semestre=new Semestre()
    this.dataEdit.tipoProyecto=new TipoProyecto()
  }
  
}
