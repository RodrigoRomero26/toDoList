import { FC, useEffect } from "react";
import styles from "./ModalViewTask.module.css";
import { taskStore } from "../../../store/taskStore";
type ModalViewTaskProps = {
	handleCloseViewModalTask: () => void;
};

export const ModalViewTask: FC<ModalViewTaskProps> = ({
	handleCloseViewModalTask,
}) => {
	const activeTask = taskStore((state) => state.activeTask);
	const setActiveTask = taskStore((state) => state.setActiveTask);

	useEffect(() => {}, [activeTask]);

	const handleClose = () => {
		setActiveTask(null);
		handleCloseViewModalTask();
	};

	return (
		<div className={styles.containerPrincipalViewModalTask}>
			<div className={styles.containerViewModalTask}>
				<div>
					<h2>{activeTask?.titulo}</h2>
				</div>
				<div className={styles.containerDataViewModalTask}>
					<div className= {styles.containerDataViewModalTaskDescripcion}>
					<p>{activeTask?.descripcion}</p>
					</div>
						<p>Fecha limite: {activeTask?.fechaLimite}</p>
						<p>Estado: {activeTask?.estado}</p>
				</div>
				<div>
					<button onClick={handleClose} className={styles.buttonCloseModal}>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	);
};
