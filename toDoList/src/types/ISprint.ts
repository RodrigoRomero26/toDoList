import { ITasks } from "./ITasks";

export interface ISprint {
    "id": string,
    "fechaInicio": Date,
    "fechaCierre": Date,
    "nombre": string,
    "tareas": ITasks[]
}