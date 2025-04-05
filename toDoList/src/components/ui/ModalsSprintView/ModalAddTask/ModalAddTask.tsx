import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { ISprint } from "../../../../types/ISprint";
import styles from "./ModalAddTask.module.css";
import { useSprint } from "../../../../hooks/useSprint";
import { ITask } from "../../../../types/ITask";
import { taskStore } from "../../../../store/taskStore";
import { sprintStore } from "../../../../store/sprintStore";
type ModalAddTaskProps = {
	handleCloseModalAddTask: () => void;
}

const initialState: ITask = {

	titulo: "",
	descripcion: "",
	estado: "",
	fechaLimite: "",
};

export const ModalAddTask: FC<ModalAddTaskProps> = ({handleCloseModalAddTask}) => {

	const activeTask = taskStore((state) => state.activeTask);
	const activeSprint = sprintStore((state) => state.activeSprint);
	const {updateExistingSprint} = useSprint()
	const [formValues, setFormValues] = useState(initialState)

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
			if(activeTask) {
				e.preventDefault();
				const updatedSprint: ISprint = {
					...activeSprint!, 
					tareas: activeSprint!.tareas.map((task) =>
					  task.id === activeTask.id ? { ...task, ...formValues } : task 
					),
				  };;
				updateExistingSprint(updatedSprint)
				handleCloseModalAddTask()
			
			}else{
				e.preventDefault();
				const newTask: ITask = {
					...formValues,
					id: crypto.randomUUID(),
				};

			const updatedSprint: ISprint = {
				...activeSprint!,
				tareas: [...activeSprint!.tareas, newTask],
			};
			updateExistingSprint(updatedSprint)
			handleCloseModalAddTask()
			}
			
		};

  return (
    <div className={styles.containerPrincipalModalAddTask}>
			<div className={styles.containerModalAddTask}>
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
						<button onClick={handleCloseModalAddTask}>Cancelar</button>
						<button type="submit">
						{activeTask ? "Editar tarea" : "Crear tarea"}
						</button>
					</div>
				</form>
			</div>
		</div>
  )
}
