import { taskStore } from "../store/taskStore";
import {
	getTasksController,
	createTaskController,
	updateTaskController,
	deleteTaskController,
} from "../data/backlogController";
import { ITask } from "../types/ITask";
import { useShallow } from "zustand/shallow";
import Swal from "sweetalert2";

export const useTask = () => {
	const { tasks, setArrayTasks, addTask, updateTask, deleteTask } = taskStore(
		useShallow((state) => ({
			tasks: state.tasks,
			setArrayTasks: state.setArrayTasks,
			addTask: state.addTask,
			updateTask: state.updateTask,
			deleteTask: state.deleteTask,
		}))
	);

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
			deleteTask(newTask.id!);
			console.error("Error en addNewTask:", error);
		}
	};

	const updateExistingTask = async (updatedTask: ITask) => {
		const previousTask = tasks.find((el) => el.id === updatedTask.id);

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
		Swal.fire({
			title: "Estas seguro?",
			text: "No podra recuperarse!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancelar",
			confirmButtonText: "Eliminar!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				if (previousTask) {
					deleteTask(idDeletedTask);
					try {
						await deleteTaskController(idDeletedTask);
					} catch (error) {
						addTask(previousTask);
						console.error("Error en deleteExistingTask:", error);
					}
				}
				Swal.fire({
					title: "Eliminado!",
					text: "Tu tarea fue eliminada.",
					icon: "success",
				});
			}
		});
	};

	const deleteTaskWithoutConfirmation = async (idDeletedTask: string) => {
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
		deleteTaskWithoutConfirmation,
		
	};
};
