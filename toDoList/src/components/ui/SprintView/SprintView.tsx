import { useEffect, useState } from "react";
import { sprintStore } from "../../../store/sprintStore";
import { TaskCardSprint } from "../TaskCardSprint/TaskCardSprint";
import styles from "./SprintView.module.css";
import { ITask } from "../../../types/ITask";
import { taskStore } from "../../../store/taskStore";
import { ModalViewTask } from "../ModalViewTask/ModalViewTask";
import { ModalAddTaskSprintView } from "../ModalsSprintView/ModalAddTaskSprintView/ModalAddTaskSprintView";
import { useParams } from "react-router-dom";
import { useSprint } from "../../../hooks/useSprint";

export const SprintView = () => {
	const {id} = useParams()
	const {getSprintById} = useSprint()
	const setActiveSprint = sprintStore((state) => state.setActiveSprint);

	const setActiveTask = taskStore((state) => state.setActiveTask);
	const activeSprint = sprintStore((state) => state.activeSprint);
	const [openModalAddTask, setOpenModalAddTask] = useState(false);
	const [openViewModalTask, setOpenViewModalTask] = useState(false);
	

	const handleOpenModalEditTask = (task: ITask) => {
		setActiveTask(task);
		setOpenModalAddTask(true);

	};

	const handleOpenModalViewTask = (task: ITask) => {
		setActiveTask(task);
		setOpenViewModalTask(true);
	};

	const handleCloseModalAddTask = () => {
		setOpenModalAddTask(false);
		setActiveTask(null);
	}

	const handleCloseModalViewTask = () => {
		setOpenViewModalTask(false);
		setActiveTask(null);
	}
	useEffect(() => {
		const fetchSprint = async () => {
			try {
				if (id) {
					const sprintData = await getSprintById(id); 
					setActiveSprint(sprintData);
				} else {
					console.error("No se encontró el ID del sprint en la URL");
				}
			} catch (error) {
				console.error("Error al obtener el sprint:", error);
			}
		};
		if (id) {
			fetchSprint();
		}
	}, [id]);

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
					<button onClick={()=>setOpenModalAddTask(true)}>Añadir Tarea</button>
				</div>
				<div className={styles.columnsSprintView}>
					<div className={`${styles.columnTaskSprintView} ${styles.pending}`}>
						<h3>Pendiente</h3>
						{pendingTasks.map((task) => (
							<TaskCardSprint
								key={task.id}
								task={task}
								handleOpenEdit={handleOpenModalEditTask}
								handleOpenView={handleOpenModalViewTask}
							/>
						))}
					</div>

					<div className={`${styles.columnTaskSprintView} ${styles.process}`}>
						<h3>En Proceso</h3>
						{inProgressTasks.map((task) => (
							<TaskCardSprint
								key={task.id}
								task={task}
								handleOpenEdit={handleOpenModalEditTask}
								handleOpenView={handleOpenModalViewTask}
							/>
						))}
					</div>

					<div className={`${styles.columnTaskSprintView} ${styles.completed}`}>
						<h3>Completado</h3>
						{completedTasks.map((task) => (
							<TaskCardSprint
								key={task.id}
								task={task}
								handleOpenEdit={handleOpenModalEditTask}
								handleOpenView={handleOpenModalViewTask}
							/>
						))}
					</div>
				</div>
			</div>
			{openModalAddTask && (
				<ModalAddTaskSprintView handleCloseModalAddTask={handleCloseModalAddTask}  />
			)}
			{openViewModalTask && (
				<ModalViewTask
					handleCloseViewModalTask={handleCloseModalViewTask}
				/>
			)}
		</>
	);
};
