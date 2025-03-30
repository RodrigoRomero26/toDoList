import axios from "axios";
import { ITask } from "../types/ITask";
import { API_URL } from "../Const";
import { putBacklog } from "../http/backlogPut";

export const getTasksController = async (): Promise<ITask[] | undefined> => {
	try {
		const response = await axios.get<{ tasks: ITask[] }>(API_URL);
		return response.data.tasks;
	} catch (error) {
		console.error("Error en getTasksController:", error);
	}
};

export const createTaskController = async (newTask: ITask) => {
	try {
		const tasksDB = await getTasksController();
		if (tasksDB) {
			await putBacklog([...tasksDB, newTask]);
		} else {
			await putBacklog([newTask]);
		}

		return newTask;
	} catch (error) {
		console.error("Error en createTaskController:", error);
	}
};

export const updateTaskController = async (updatedTask: ITask) => {
	try {
		const tasksDB = await getTasksController();
		if (tasksDB) {
			const result = tasksDB.map((tasksDB) =>
				tasksDB.id === updatedTask.id ? { ...tasksDB, ...updatedTask } : tasksDB
			);
			await putBacklog(result);
		}
	} catch (error) {
		console.error("Error en updateTaskController:", error);
	}
};

export const deleteTaskController = async (idDeletedTask: string) => {
	try {
		const tasksDB = await getTasksController();
		if (tasksDB) {
			const result = tasksDB.filter((task) => task.id !== idDeletedTask);
			await putBacklog(result);
		}
	} catch (error) {
		console.error("Error en deleteTaskController:", error);
	}
};
