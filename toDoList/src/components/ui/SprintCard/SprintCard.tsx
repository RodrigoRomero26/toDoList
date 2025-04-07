import { FC } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from "./SprintCard.module.css";
import { useSprint } from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";
import { useNavigate } from "react-router-dom";

type SprintCardProps = {
	sprint: ISprint;
	handleOpenModalEdit: (sprint: ISprint) => void;
};

export const SprintCard: FC<SprintCardProps> = ({
	sprint,
	handleOpenModalEdit,
}) => {
	const { deleteExistingSprint } = useSprint();
	const setActiveSprint = sprintStore((state) => state.setActiveSprint);
	const setActiveSprintForRoute = sprintStore(
		(state) => state.setActiveSprintForRoute
	);
	const navigate = useNavigate();

	const handleDeleteSprint = () => {
		deleteExistingSprint(sprint.id!);
	};

	const handleEditSprint = () => {
		handleOpenModalEdit(sprint);
	};

	const handleViewSprint = () => {
		setActiveSprintForRoute(sprint);
		setActiveSprint(sprint);
		navigate("/sprint" );
	};

	return (
		<div className={styles.sprintCard}>
			<div className={styles.sprintCardData}>
				<h2>{sprint.nombre}</h2>
				<p>Fecha Inicio: {sprint.fechaInicio}</p>
				<p>Fecha cierre: {sprint.fechaCierre}</p>
			</div>
			<div className={styles.sprintCardActions}>
				<button onClick={handleViewSprint}>
					<span className="material-symbols-outlined">visibility</span>
				</button>
				<button onClick={handleEditSprint}>
					<span className="material-symbols-outlined">edit</span>
				</button>
				<button onClick={handleDeleteSprint}>
					<span className="material-symbols-outlined">delete</span>
				</button>
			</div>
		</div>
	);
};
