import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import { TipoProyectosService } from 'src/app/services/tipoProyectos/tipo-proyectos.service';
import { SemestresService } from 'src/app/services/semestres/semestres.service';
import { CoordinadoresService } from 'src/app/services/coordinadores/coordinadores.service';
import { ProyectosEtapaService } from 'src/app/services/proyectos_etapa/proyectos-etapa.service';
import { GestionarProyectoService } from '../../services/gestionar-proyecto.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestionar-proyecto-list',
  templateUrl: './gestionar-proyecto-list.component.html',
  styleUrls: ['./gestionar-proyecto-list.component.css']
})
export class GestionarProyectoListComponent implements OnInit{
  //Creando arreglos que vamos a utilizar:
  coordinador: any;
  tipo_proyecto:any;
  semestre:any;
  proyectos:any;
  proyectos_etapa: any;
  _serviceGestionar = inject(GestionarProyectoService);

  constructor(
    public coordinadoresSevice: CoordinadoresService,
    public tipoProyectoService: TipoProyectosService,
    public semestresService: SemestresService,
    public proyectosService: ProyectosService,
    public proyectosEtapasService: ProyectosEtapaService
  ){}
  ngOnInit(): void {

    //LISTAR PROYECTOS:
    this.proyectosService.getallProyectos().subscribe(resp=>{
      this.proyectos=resp;
    })

    //LISTAR ETAPAS DE PROYECTO_ETAPA:
    this.proyectosEtapasService.getallProyectosEtapas().subscribe(resp=>{
      this.proyectos_etapa=resp;
    })
  }

  editar(data:any){
     console.log(data);
    this._serviceGestionar.editData.next(data)
  }

  deleteProyecto(id:number){
    /*VENTANA MODAL DE ELIMINAR*/
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Deseas Eliminar el Proyecto?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
    this._serviceGestionar.deleteProyecto(id).subscribe(resp=>{
      swalWithBootstrapButtons.fire({
        title: "¡Eliminar!",
        text: "El proyecto ha sido eliminado",
        icon: "success"
      });
      this.proyectosService.getallProyectos().subscribe(resp=>{
        this.proyectos=resp;
      })

      
    })
      
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El proyecto esta a salvo :)",
          icon: "error"
        });
      }
    });
  }
  
    
}

