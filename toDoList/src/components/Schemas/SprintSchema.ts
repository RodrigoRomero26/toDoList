import * as Yup from "yup";

export const sprintSchema = Yup.object().shape({
	fechaInicio: Yup.date()
		.required("La fecha de inicio es obligatoria")
		.test("is-future-date", "La fecha no puede ser anterior a hoy", (value) => {
			if (!value) return false;
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const selectedDate = new Date(value);
			selectedDate.setHours(0, 0, 0, 0);
			return selectedDate >= today;
		}),
	fechaCierre: Yup.date()
		.required("La fecha de cierre es obligatoria")
		.test("is-future-date", "La fecha no puede ser anterior a hoy", (value) => {
			if (!value) return false;
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const selectedDate = new Date(value);
			selectedDate.setHours(0, 0, 0, 0);
			return selectedDate >= today;
		})
		.test(
			"is-after-start",
			"La fecha de cierre no puede ser anterior a la fecha de inicio",
			function (value) {
				const { fechaInicio } = this.parent;
				if (!value || !fechaInicio) return false;
				const cierre = new Date(value);
				const inicio = new Date(fechaInicio);
				cierre.setHours(0, 0, 0, 0);
				inicio.setHours(0, 0, 0, 0);
				return cierre >= inicio;
			}
		),
	nombre: Yup.string()
		.required("El nombre es obligatorio")
		.min(5, "El nombre debe tener al menos 5 caracteres"),
});
