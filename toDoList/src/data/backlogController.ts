import axios from "axios";
import { ITask } from "../types/ITask";
import { putBacklog } from "../http/backlogPut";

const API_URL = import.meta.env.VITE_BACKLOG_API_URL as string;

export const getTasksController = async (): Promise<ITask[]> => {
	try {
		const response = await axios.get<{ tareas: ITask[] }>(API_URL);
		return response.data.tareas;
	} catch (error) {
		console.error("Error en getTasksController:", error);
		return [];
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
			const updatedTasks = tasksDB.filter((task) => task.id !== idDeletedTask);
			await putBacklog(updatedTasks);
		}
	} catch (error) {
		console.error("Error en deleteTaskController:", error);
	}
};
