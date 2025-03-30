import styles from "./ModalCreateTask.module.css";
export const ModalCreateTask = () => {

    


	return (
		<div className={styles.containerPrincipalModalCreateTask}>
			<div className={styles.containerModalCreateTask}>
				<h2>Crear Tarea</h2>
				<form className={styles.containerForm}>
					<div className={styles.containerInput}>
						<input
							type="text"
							placeholder="Nombre de la tarea"
							required
							autoComplete="off"
							name="titulo"
						/>
						<textarea
							name="descripcion"
							placeholder="Descripcion de la tarea"
							required
							autoComplete="off"></textarea>
						<input type="date" name="fecha" required autoComplete="off" />
					</div>
                    <div className={styles.containerButtons}>
                        <button>Cancelar</button>
                        <button type="submit">Crear tarea</button>
                    </div>
				</form>
			</div>
		</div>
	);
};
