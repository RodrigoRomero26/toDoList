import { FC, useState } from "react";
import styles from "./ModalAddSprint.module.css";

import { useSprint } from "../../../../hooks/useSprint";
import { ISprint } from "../../../../types/ISprint";
import Swal from "sweetalert2";

type ModalAddSprintProps = {
	handleCloseModalSprint: () => void;
};

const initialState: ISprint = {
	fechaInicio: "",
	fechaCierre: "",
	nombre: "",
	tareas: [],
};

export const ModalAddSprint: FC<ModalAddSprintProps> = ({
	handleCloseModalSprint,
}) => {
	const { addNewSprint } = useSprint();

	const [formValues, setFormValues] = useState(initialState);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
	};

	const today = new Date().toISOString().split("T")[0]


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formValues.fechaInicio < today || formValues.fechaCierre < today) {
			
			Swal.fire({
				title: "Error",
				text: "Las fechas no pueden ser anteriores a la fecha actual",
				icon: "error",
				confirmButtonText: "Aceptar",
			  });
			return;
		}
		addNewSprint({ ...formValues, id: crypto.randomUUID() });

		handleCloseModalSprint();
	};

	return (
		<div className={styles.containerPrincipalModalSprint}>
			<div className={styles.containerModalSprint}>
				<h2>Crear Sprint</h2>
				<form onSubmit={handleSubmit} className={styles.containerForm}>
					<div className={styles.containerInput}>
						<input
							type="text"
							name="nombre"
							placeholder="Nombre del Sprint"
							required
							autoComplete="off"
							value={formValues.nombre}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.containerInput}>
						<label htmlFor="fechaInicio">Fecha de Inicio</label>
						<input
							type="date"
							name="fechaInicio"
							required
							autoComplete="off"
							value={formValues.fechaInicio}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.containerInput}>
						<label htmlFor="fechaCierre">Fecha de Cierre</label>
						<input
							type="date"
							name="fechaCierre"
							required
							autoComplete="off"
							value={formValues.fechaCierre}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.containerButtons}>
						<button onClick={handleCloseModalSprint}>Cancelar</button>
						<button type="submit">Crear Sprint</button>
					</div>
				</form>
			</div>
		</div>
	);
};
