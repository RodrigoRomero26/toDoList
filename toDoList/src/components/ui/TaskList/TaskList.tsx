
import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./TaskList.module.css";
export const TaskList = () => {
	return (
			<div className={styles.containerDataTaskList}>
				<div className={styles.titleandbuttonTaskList}>
					
					<h2>Backlog</h2>
					<button>Crear Tarea</button>
				</div>
				<div className={styles.containerTasks}>
                    <TaskCard/>
					<TaskCard/>
					<TaskCard/>
					<TaskCard/>
					<TaskCard/>
					<TaskCard/>
					<TaskCard/>
					<TaskCard/>
                </div>
			</div>
	
	);
};
