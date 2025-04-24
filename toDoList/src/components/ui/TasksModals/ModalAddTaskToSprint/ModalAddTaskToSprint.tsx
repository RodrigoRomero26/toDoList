import { FC, useEffect, useState } from "react";
import styles from "./ModalAddTaskToSprint.module.css";
import { taskStore } from "../../../../store/taskStore";
import { sprintStore } from "../../../../store/sprintStore";
import { ISprint } from "../../../../types/ISprint";
import { useSprint } from "../../../../hooks/useSprint";
import { useTask } from "../../../../hooks/useTask";

type ModalAddTaskToSprintProps = {
	handleCloseModalAddTask: () => void;
};

export const ModalAddTaskToSprint: FC<ModalAddTaskToSprintProps> = ({
	handleCloseModalAddTask,
}) => {
	const activeTask = taskStore((state) => state.activeTask);
	const sprints = sprintStore((state) => state.sprints);

	const { updateExistingSprint } = useSprint();
	const { deleteTaskWithoutConfirmation } = useTask();

	const [selectedSprintId, setSelectedSprintId] = useState<string | null>(null);

	useEffect(() => {
		if (sprints.length > 0 && selectedSprintId === null) {
			setSelectedSprintId(sprints[0]?.id || null);
		}
	}, [sprints, selectedSprintId]);

	const handleUpdateSprint = async () => {
		if (!selectedSprintId || !activeTask) return;

		const selectedSprint = sprints.find((s) => s.id === selectedSprintId);
		if (!selectedSprint) return;

		const updatedSprint: ISprint = {
			...selectedSprint,
			tareas: [...selectedSprint.tareas, activeTask],
		};

		await updateExistingSprint(updatedSprint);
		await deleteTaskWithoutConfirmation(activeTask.id!);

		handleCloseModalAddTask();
	};

	return (
		<div className={styles.containterPrincipalModalAddTask}>
			<div className={styles.containerModalAddTask}>
				<div className={styles.containerData}>
					<div className={styles.card}>
						<h2>Agregar tarea</h2>
						<div className={styles.taskInfo}>
							<p>
								<strong>Tarea:</strong> {activeTask?.titulo}
							</p>
							<p>
								<strong>Al Sprint:</strong>{" "}
								{sprints.find((s) => s.id === selectedSprintId)?.nombre}
							</p>
						</div>
					</div>

					<label>Seleccionar Sprint:</label>
					{sprints.length > 0 ? (
						<select
							value={selectedSprintId || ""}
							onChange={(e) => setSelectedSprintId(e.target.value)}>
							{sprints.map((sprint) => (
								<option key={sprint.id} value={sprint.id}>
									{sprint.nombre}
								</option>
							))}
						</select>
					) : (
						<p>No hay sprints disponibles.</p>
					)}
				</div>

				<div className={styles.containerButtons}>
					<button
						className={styles.cancelbtn}
						onClick={handleCloseModalAddTask}>
						Cancelar
					</button>
					<button className={styles.submitbtn} onClick={handleUpdateSprint}>
						Agregar Tarea
					</button>
				</div>
			</div>
		</div>
	);
};
