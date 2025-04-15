import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./ModalTask.module.css";
import { taskStore } from "../../../../store/taskStore";
import { useTask } from "../../../../hooks/useTask";
import { ITask } from "../../../../types/ITask";
import Swal from "sweetalert2";

type ModalTaskProps = {
	handleCloseModalTask: () => void;
};

const initialState: ITask = {
	titulo: "",
	descripcion: "",
	estado: "",
	fechaLimite: "",
};

export const ModalTask: FC<ModalTaskProps> = ({ handleCloseModalTask }) => {
	const activeTask = taskStore((state) => state.activeTask);
	const setActiveTask = taskStore((state) => state.setActiveTask);
	const { addNewTask, updateExistingTask } = useTask();
	const [formValues, setFormValues] = useState(initialState);
	const today = new Date().toISOString().split("T")[0]

	useEffect(() => {
		if (activeTask) {
			setFormValues({
				id: activeTask.id,
				titulo: activeTask.titulo,
				descripcion: activeTask.descripcion,
				fechaLimite: activeTask.fechaLimite,
				estado: activeTask.estado,
			});
		}
	}, []);

	const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
  };

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (activeTask) {
			if (formValues.fechaLimite < activeTask.fechaLimite) {
        Swal.fire({
          title: "Error",
          text: "La fecha no puede ser anterior a la fecha actual",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
		setFormValues((prev) => ({
			...prev,
			fechaInicio: activeTask!.fechaLimite
		}));
        return;
      }
			updateExistingTask(formValues);
		} else {
			if (formValues.fechaLimite < today) {
		Swal.fire({
		  title: "Error",
		  text: "La fecha no puede ser anterior a la fecha actual",
		  icon: "error",
		  confirmButtonText: "Aceptar",
		})
		return;
	}
			addNewTask({ ...formValues, id: crypto.randomUUID() });
		}
		setActiveTask(null);
		handleCloseModalTask();
	};

	return (
		<div className={styles.containerPrincipalModalTask}>
			<div className={styles.containerModalTask}>
				<h2>{activeTask ? "Editar tarea" : "Crear tarea"}</h2>
				<form onSubmit={handleSubmit} className={styles.containerForm}>
					<div className={styles.containerInput}>
						<input
							type="text"
							placeholder="Nombre de la tarea"
							required
							value={formValues.titulo}
							onChange={handleChange}
							autoComplete="off"
							name="titulo"
						/>
						<textarea
							name="descripcion"
							placeholder="Descripcion de la tarea"
							required
							value={formValues.descripcion}
							onChange={handleChange}
							autoComplete="off"></textarea>
						<input
							type="date"
							name="fechaLimite"
							required
							value={formValues.fechaLimite}
							onChange={handleChange}
							autoComplete="off"
						/>
						<select
							name="estado"
							required
							value={formValues.estado}
							onChange={(e) =>
								setFormValues((prev) => ({
									...prev,
									estado: e.target.value,
								}))
							}
							autoComplete="off">
							<option value="" disabled>
								Selecciona un estado
							</option>
							<option value="Pendiente">Pendiente</option>
							<option value="En proceso">En proceso</option>
							<option value="Completado">Completado</option>
						</select>
					</div>
					<div className={styles.containerButtons}>
						<button onClick={handleCloseModalTask}>Cancelar</button>
						<button type="submit">
							{activeTask ? "Editar tarea" : "Crear tarea"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
