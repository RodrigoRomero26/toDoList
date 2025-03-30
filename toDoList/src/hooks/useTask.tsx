import { taskStore } from "../store/taskStore";
import {
	getTasksController,
	createTaskController,
	updateTaskController,
	deleteTaskController,
} from "../data/backlogController";
import { ITask } from "../types/ITask";

export const useTask = () => {
	const {
		tasks,
		setArrayTasks,
		addTask,
		updateTask,
		deleteTask,
	} = taskStore((state) => ({
		tasks: state.tasks,
		setArrayTasks: state.setArrayTasks,
		activeTask: state.activeTask,
		setActiveTask: state.setActiveTask,
		addTask: state.addTask,
		updateTask: state.updateTask,
		deleteTask: state.deleteTask,
	}));

	const getTasks = async () => {
		const data = await getTasksController();
		if (data) {
			setArrayTasks(data);
		}
	};

	const addNewTask = async (newTask: ITask) => {
		addTask(newTask);
		try {
			await createTaskController(newTask);
		} catch (error) {
			deleteTask(newTask.id);
			console.error("Error en addNewTask:", error);
		}
	};

	const updateExistingTask = async (updatedTask: ITask) => {
		const previousTask = tasks.find((task) => task.id === updatedTask.id);
		if (previousTask) {
			updateTask(updatedTask);
			try {
				await updateTaskController(updatedTask);
			} catch (error) {
				updateTask(previousTask);
				console.error("Error en updateExistingTask:", error);
			}
		}
	};

	const deleteExistingTask = async (idDeletedTask: string) => {
		const previousTask = tasks.find((task) => task.id === idDeletedTask);
		if (previousTask) {
			deleteTask(idDeletedTask);
			try {
				await deleteTaskController(idDeletedTask);
			} catch (error) {
				addTask(previousTask);
				console.error("Error en deleteExistingTask:", error);
			}
		}
	};

	return {
		tasks,
		getTasks,
		addNewTask,
		updateExistingTask,
		deleteExistingTask,
	};
};
