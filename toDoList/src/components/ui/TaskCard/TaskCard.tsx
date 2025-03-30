import { FC } from "react";
import { ITask } from "../../../types/ITask";
import styles from "./TaskCard.module.css";
import { useTask } from "../../../hooks/useTask";

type TaskCardProps = {
	task: ITask;
	handleOpenModalEdit: (task: ITask) => void;
	handleOpenView: (task: ITask) => void;
}

export const TaskCard: FC<TaskCardProps> = ({task, handleOpenModalEdit, handleOpenView}) => {

	const {deleteExistingTask } = useTask();

	const handleDeleteTask = () => {
		deleteExistingTask(task.id!);
	};

	const handleEditTask = () => {
		handleOpenModalEdit(task);
	}

	const handleViewTask = () => {
		handleOpenView(task);
	}

	return (
		<div className={styles.containerPrincipaltaskCard}>
			<div className={styles.taskCardData}>
				<h2>{task.titulo}</h2>
				
				<p>
					Fecha Limite: {task.fechaLimite}
				</p>
				<p>
					Estado: {task.estado}
				</p>
			</div>
			<div className={styles.taskCardActions}>
				<div>
					<button>
						<span className="material-symbols-outlined">add</span>
					</button>
				</div>
				<div className={styles.taskCardActionsButtons}>
				<button onClick={handleViewTask}>
					<span className="material-symbols-outlined">visibility</span>
				</button>
				<button onClick={handleEditTask}>
					<span className="material-symbols-outlined">edit</span>
				</button>
				<button onClick={handleDeleteTask}>
					<span className="material-symbols-outlined">delete</span>
				</button>
				</div>
			</div>
		</div>
	);
};
