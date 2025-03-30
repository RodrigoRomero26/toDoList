import { Aside } from "../../ui/Aside/Aside";
import { Header } from "../../ui/Header/Header";
import { ModalCreateTask } from "../../ui/ModalCreateTask/ModalCreateTask";
import { TaskList } from "../../ui/TaskList/TaskList";
import styles from "./BacklogScreen.module.css";
export const BacklogScreen = () => {
	return (
		<div className={styles.containerBacklogScreen}>
			<Header />
			<div className={styles.containerAsideTaskList}>
				<Aside />
				<TaskList />
				<ModalCreateTask />
			</div>
		</div>
	);
};
