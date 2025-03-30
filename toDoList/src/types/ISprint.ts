import { ITasks } from "./ITask";

export interface ISprint {
    "id": string,
    "fechaInicio": Date,
    "fechaCierre": Date,
    "nombre": string,
    "tareas": ITasks[]
}