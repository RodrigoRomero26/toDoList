import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { ISprint } from "../../../../types/ISprint";
import styles from "./ModalAddTaskSprintView.module.css";
import { useSprint } from "../../../../hooks/useSprint";
import { ITask } from "../../../../types/ITask";
import { taskStore } from "../../../../store/taskStore";
import { sprintStore } from "../../../../store/sprintStore";
import { taskSchema } from "../../../Schemas/TaskSchema";
type ModalAddTaskProps = {
	handleCloseModalAddTask: () => void;
};

const initialState: ITask = {
	titulo: "",
	descripcion: "",
	estado: "Pendiente",
	fechaLimite: "",
};

export const ModalAddTaskSprintView: FC<ModalAddTaskProps> = ({
	handleCloseModalAddTask,
}) => {
	const activeTask = taskStore((state) => state.activeTask);
	const activeSprint = sprintStore((state) => state.activeSprint);
	const setActiveSprint = sprintStore((state) => state.setActiveSprint);
	const { updateExistingSprint } = useSprint();
	const [formValues, setFormValues] = useState(initialState);

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

	const handleChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [`${name}`]: value }));

		try {
			await taskSchema.validateAt(name, { ...formValues, [name]: value });
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		} catch (err: any) {
			setErrors((prev) => ({ ...prev, [name]: err.message }));
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		if (activeTask) {
			e.preventDefault();
			await taskSchema.validate(formValues, { abortEarly: false });
			const updatedSprint: ISprint = {
				...activeSprint!,
				tareas: activeSprint!.tareas.map((task) =>
					task.id === activeTask.id ? { ...task, ...formValues } : task
				),
			};
			updateExistingSprint(updatedSprint);
			setActiveSprint(updatedSprint);
			handleCloseModalAddTask();
		} else {
			e.preventDefault();
			await taskSchema.validate(formValues, { abortEarly: false });
			const newTask: ITask = {
				...formValues,
				id: crypto.randomUUID(),
			};

			const updatedSprint: ISprint = {
				...activeSprint!,
				tareas: [...activeSprint!.tareas, newTask],
			};
			updateExistingSprint(updatedSprint);
			setActiveSprint(updatedSprint);
			handleCloseModalAddTask();
		}
	};
	const isFormValid = () => {
		const hasErrors = Object.keys(errors).length > 0;
		const hasEmptyFields = Object.values(formValues).some(
			(value) => value.trim() === ""
		);
		return !hasErrors && !hasEmptyFields;
	};

	useEffect(() => {
		isFormValid();
	}, [formValues]);

	const [errors, setErrors] = useState<Record<string, string>>({});

	return (
		<div className={styles.containerPrincipalModalAddTask}>
			<div className={styles.containerModalAddTask}>
				<h2>{activeTask ? "Editar tarea" : "Crear tarea"}</h2>
				<form onSubmit={handleSubmit} className={styles.containerForm}>
					<div className={styles.containerInput}>
						<div className={styles.inputContainer}>
							<input
								type="text"
								placeholder="Nombre de la tarea"
								required
								value={formValues.titulo}
								onChange={handleChange}
								autoComplete="off"
								name="titulo"
							/>
							{errors.titulo && <p className={styles.error}>{errors.titulo}</p>}
						</div>
						<div className={styles.inputContainer}>
							<textarea
								name="descripcion"
								placeholder="Descripcion de la tarea"
								required
								value={formValues.descripcion}
								onChange={handleChange}
								autoComplete="off"></textarea>
							{errors.descripcion && (
								<p className={styles.error}>{errors.descripcion}</p>
							)}
						</div>
						<div className={styles.inputContainer}>
							<label htmlFor="fechaLimite">Fecha de Cierre</label>
							<input
								type="date"
								name="fechaLimite"
								required
								value={formValues.fechaLimite}
								onChange={handleChange}
								autoComplete="off"
							/>
							{errors.fechaLimite && (
								<p className={styles.error}>{errors.fechaLimite}</p>
							)}
						</div>
						{activeTask ? (
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
								<option value="Pendiente">Pendiente</option>
								<option value="En proceso">En proceso</option>
								<option value="Completado">Completado</option>
							</select>
						) : null}
					</div>
					<div className={styles.containerButtons}>
						<button
							className={styles.cancelbtn}
							onClick={handleCloseModalAddTask}>
							Cancelar
						</button>
						<button
							className={styles.submitbtn}
							disabled={!isFormValid()}
							type="submit">
							{activeTask ? "Editar tarea" : "Crear tarea"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
