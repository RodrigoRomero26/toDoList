import { FC, useEffect, useState } from "react";
import styles from "./ModalEditSprint.module.css";
import { sprintStore } from "../../../../store/sprintStore";
import { useSprint } from "../../../../hooks/useSprint";
import { ISprint } from "../../../../types/ISprint";
import Swal from "sweetalert2";

type ModalEditSprintProps = {
	handleCloseModalSprint: () => void;
};

const initialState: ISprint = {
	fechaInicio: "",
	fechaCierre: "",
	nombre: "",
	tareas: [],
};

export const ModalEditSprint: FC<ModalEditSprintProps> = ({ handleCloseModalSprint}) => {
    const activeSprint = sprintStore((state) => state.activeSprint);
    const setActiveSprint = sprintStore((state) => state.setActiveSprint);

    const { updateExistingSprint } = useSprint();

    const [formValues, setFormValues] = useState(initialState);


    useEffect(() => {
        if (activeSprint) {
            setFormValues({
                id: activeSprint.id,
                fechaInicio: activeSprint.fechaInicio,
                fechaCierre: activeSprint.fechaCierre,
                nombre: activeSprint.nombre,
                tareas: activeSprint.tareas

            });
        }
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (formValues.fechaInicio < activeSprint!.fechaInicio) {
            Swal.fire({
                title: "Error",
                text: "La nueva fecha de inicio no puede ser previa a la original",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
    
            
            setFormValues((prev) => ({
                ...prev,
                fechaInicio: activeSprint!.fechaInicio
            }));
    
            return;
        }
    
        if (formValues.fechaCierre < formValues.fechaInicio) {
            Swal.fire({
              title: "Error",
              text: "La nueva fecha de cierre no puede ser previa a la fecha de inicio",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
    
            
            setFormValues((prev) => ({
                ...prev,
                fechaCierre: activeSprint!.fechaCierre
            }));
    
            return;
        }
    
        updateExistingSprint(formValues);
        setActiveSprint(null);
        handleCloseModalSprint();
    };
    


	return (
        <div className={styles.containerPrincipalModalSprint}>
            <div className={styles.containerModalSprint}>
                <h2>Editar Sprint</h2>
                <form onSubmit={handleSubmit} className={styles.containerForm}> 
                    <div className={styles.containerInput}>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre del Sprint"
                            required
                            autoComplete="off"
                            value={formValues.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.containerInput}>
                    <label htmlFor="fechaInicio">Fecha de Inicio</label>
                        <input
                            type="date"
                            name="fechaInicio"
                            required
                            autoComplete="off"
                            value={formValues.fechaInicio}
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className={styles.containerInput}>
                        <label htmlFor="fechaCierre">Fecha de Cierre</label>
                        <input
                            type="date"
                            name="fechaCierre"
                            required
                            autoComplete="off"
                            value={formValues.fechaCierre}
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className={styles.containerButtons}>
                    <button onClick={handleCloseModalSprint}>Cancelar</button>
                    <button type="submit" >
                        Actualizar Sprint
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}