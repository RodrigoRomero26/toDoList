import { FC, useEffect, useState } from "react";
import styles from "./ModalSprint.module.css";
import { sprintStore } from "../../../store/sprintStore";
import { useSprint } from "../../../hooks/useSprint";
import { ISprint } from "../../../types/ISprint";

type ModalSprintProps = {
	handleCloseModalSprint: () => void;
};

const initialState: ISprint = {
	fechaInicio: "",
	fechaCierre: "",
	nombre: "",
	tareas: [],
};

export const ModalSprint: FC<ModalSprintProps> = ({ handleCloseModalSprint}) => {
    const activeSprint = sprintStore((state) => state.activeSprint);
    const setActiveTask = sprintStore((state) => state.setActiveSprint);

    const { addNewSprint, updateExistingSprint } = useSprint();

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
        if (activeSprint) {
            updateExistingSprint(formValues);
        } else {
            addNewSprint({ ...formValues, id: crypto.randomUUID() });
        }
        setActiveTask(null);
        handleCloseModalSprint();
    };


	return (
        <div className={styles.containerPrincipalModalSprint}>
            <div className={styles.containerModalSprint}>
                <h2>{activeSprint ? "Editar Sprint" : "Crear Sprint"}</h2>
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
                        {activeSprint ? "Actualizar Sprint" : "Crear Sprint"}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}