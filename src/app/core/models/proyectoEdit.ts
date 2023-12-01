import { Semestre } from "./semestre"
import { TipoProyecto } from "./tipoProyecto"

export class ProyectoEdit{
    id!:number
    descripcion!:string
    fechaInicio!:string
    fechaFin!:string
    localidad!:string
    nombre!:string
    codigo!:string
    objetivo!:string
    perfil_proyecto!:any
    poblacionBenef!:string
    presupuesto!:number
    semestre!:Semestre;
    tipoProyecto!:TipoProyecto;
}