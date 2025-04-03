import { FC } from "react";
import { ITask } from "../../../types/ITask";
import styles from "./TaskCardSprint.module.css";

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

	const handleEditTask = () => {
		handleOpenEdit(task);
	}

	const handleViewTask = () => {
		handleOpenView(task);}

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
					<button>Backlog</button>
				</div>
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
