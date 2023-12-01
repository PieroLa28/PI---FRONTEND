import { Semestre } from "./semestre"
import { TipoProyecto } from "./tipoProyecto"

export class Proyecto{
    id!:number
    descripcion!:string
    fechaInicio!:string
    fechaFin!:string
    localidad!:string
    nombre!:string
    codigo!:string
    objetivo!:string
    perfilProyecto!:any
    poblacionBenef!:string
    presupuesto!:number
    semestre!: any;
    tipoProyecto!:any;
}