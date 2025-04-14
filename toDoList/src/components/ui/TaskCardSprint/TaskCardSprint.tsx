import { FC } from "react";
import { ITask } from "../../../types/ITask";
import styles from "./TaskCardSprint.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { useTask } from "../../../hooks/useTask";
import { sprintStore } from "../../../store/sprintStore";
import Tooltip from "../Tooltip/Tooltip";

type TaskCardSprintProps = {
	task: ITask;
	handleOpenView: (task: ITask) => void;
	handleOpenEdit: (task: ITask) => void;
};

export const TaskCardSprint: FC<TaskCardSprintProps> = ({
	task,
	handleOpenEdit,
	handleOpenView,
}) => {
	const { updateExistingSprint } = useSprint();
	const { addNewTask } = useTask();
	const activeSprint = sprintStore((state) => state.activeSprint);
	const setActiveSprint = sprintStore((state) => state.setActiveSprint);
	const actualTime = new Date().getTime();
	const taskTime = new Date(task.fechaLimite).getTime();
	const taskTimeLimit = taskTime - actualTime;

	const dayMs = 1000 * 60 * 60 * 24;
	const missingDays = Math.floor(taskTimeLimit / dayMs);

	const showWarning = missingDays <= 3 && task.estado !== "Completado";
	const handleEditTask = () => {
		handleOpenEdit(task);
	};

	const handleViewTask = () => {
		handleOpenView(task);
		console.log(actualTime, taskTime, taskTimeLimit);
	};

	const handleBacklogTask = () => {
		const updatedSprint = {
			...activeSprint!,
			tareas: activeSprint!.tareas.filter((t) => {
				return t.id !== task.id;
			}),
		};
		addNewTask(task);
		updateExistingSprint(updatedSprint);
		setActiveSprint(updatedSprint);
	};

	const timeWarning = () => {
		return (
			<Tooltip text="Tarea proxima a vencer">
				<button>
					<span className="material-symbols-outlined">error</span>
				</button>
			</Tooltip>
		);
	};
	return (
		<div className={styles.containerPrincipalTaskCardSprint}>
			<div className={styles.taskCardSprintData}>
				<h2>{task.titulo}</h2>

				<p>Fecha Limite: {task.fechaLimite}</p>
				<p
					className={`${styles.taskStatus} ${
						styles[task.estado.toLowerCase().replace(/\s+/g, "")]
					}`}>
					Estado: {task.estado}
				</p>
			</div>
			<div className={styles.taskCardSprintActions}>
				<div>
					<button onClick={handleBacklogTask}>Backlog</button>
				</div>
				{showWarning && (
					<div className={styles.taskCardSprintActionsWarning}>{timeWarning()}</div>
				)}

				<div className={styles.taskCardSprintActionsButtons}>
					<button onClick={handleViewTask}>
						<span className="material-symbols-outlined">visibility</span>
					</button>
					<button onClick={handleEditTask}>
						<span className="material-symbols-outlined">edit</span>
					</button>
				</div>
			</div>
		</div>
	);
};
