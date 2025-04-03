import { useEffect, useState } from "react";
import { sprintStore } from "../../../store/sprintStore";
import { TaskCardSprint } from "../TaskCardSprint/TaskCardSprint";
import styles from "./SprintView.module.css";
import { ITask } from "../../../types/ITask";
import { taskStore } from "../../../store/taskStore";
import { ModalTask } from "../ModalTask/ModalTask";
import { ModalViewTask } from "../ModalViewTask/ModalViewTask";
import { useSprint } from "../../../hooks/useSprint";
import { ISprint } from "../../../types/ISprint";

export const SprintView = () => {
	const setActiveTask = taskStore((state) => state.setActiveTask);
	const activeSprint = sprintStore((state) => state.activeSprint);
	const [openModalTask, setOpenModalTask] = useState(false);
	const [openViewModalTask, setOpenViewModalTask] = useState(false);

	const handleOpenModalTask = (task: ITask) => {
		setActiveTask(task);
		setOpenModalTask(true);
	};

	const handleOpenViewTask = (task: ITask) => {
		setActiveTask(task);
		setOpenViewModalTask(true);
	};

	useEffect(() => {}, [activeSprint]);

	const sprintTasks = activeSprint?.tareas || [];

	const pendingTasks = sprintTasks.filter(
		(task) => task.estado === "Pendiente"
	);
	const inProgressTasks = sprintTasks.filter(
		(task) => task.estado === "En proceso"
	);
	const completedTasks = sprintTasks.filter(
		(task) => task.estado === "Completado"
	);

	return (
		<>
			<div className={styles.sprintViewPrincipalContainer}>
				<div className={styles.titleAndButtonSprintView}>
					<div></div>
					<h2>{activeSprint?.nombre}</h2>
					<button>Añadir Tarea</button>
				</div>
				<div className={styles.columnsSprintView}>
					<div className={`${styles.columnTaskSprintView} ${styles.pending}`}>
						<h3>Pendiente</h3>
						{pendingTasks.map((task) => (
							<TaskCardSprint
								key={task.id}
								task={task}
								handleOpenEdit={handleOpenModalTask}
								handleOpenView={handleOpenViewTask}
							/>
						))}
					</div>

					<div className={`${styles.columnTaskSprintView} ${styles.process}`}>
						<h3>En Proceso</h3>
						{inProgressTasks.map((task) => (
							<TaskCardSprint
								key={task.id}
								task={task}
								handleOpenEdit={handleOpenModalTask}
								handleOpenView={handleOpenViewTask}
							/>
						))}
					</div>

					<div className={`${styles.columnTaskSprintView} ${styles.completed}`}>
						<h3>Completado</h3>
						{completedTasks.map((task) => (
							<TaskCardSprint
								key={task.id}
								task={task}
								handleOpenEdit={handleOpenModalTask}
								handleOpenView={handleOpenViewTask}
							/>
						))}
					</div>
				</div>
			</div>
			{openModalTask && (
				<ModalTask handleCloseModalTask={() => setOpenModalTask(false)} />
			)}
			{openViewModalTask && (
				<ModalViewTask
					handleCloseViewModalTask={() => setOpenViewModalTask(false)}
				/>
			)}
		</>
	);
};
