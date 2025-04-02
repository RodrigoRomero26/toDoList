import { useEffect, useState } from "react";
import { useSprint } from "../../../hooks/useSprint";
import { sprintStore } from "../../../store/sprintStore";
import { SprintCard } from "../SprintCard/SprintCard";
import styles from "./SprintList.module.css";
import { ISprint } from "../../../types/ISprint";
import { ModalSprint } from "../ModalSprint/ModalSprint";
export const SprintList = () => {
	const setActiveSprint = sprintStore((state) => state.setActiveSprint);
	const { getSprints, sprints } = useSprint();

	useEffect(() => {
		getSprints();
	}, []);

	const [openModalSprint, setOpenModalSprint] = useState(false);

	const handleOpenModalEditSprint = (sprint: ISprint) => {
		setActiveSprint(sprint);
		setOpenModalSprint(true);
	};

	const handleCloseModalSprint = () => {
		setOpenModalSprint(false);
		setActiveSprint(null);
	};

	return (
		<>
		<div className={styles.containerPrincipalListSprints}>
			<div className={styles.containerTitleListSprints}>
				<h1>Sprints</h1>
			</div>
			<div className={styles.containerSprints}>
				{sprints.length > 0 ? (
					sprints.map((el) => (
						<SprintCard
							key={el.id}
							handleOpenModalEdit={handleOpenModalEditSprint}
							sprint={el}
						/>
					))
				) : (
					<p>No hay sprints</p>
				)}
			</div>
			<div className={styles.containerButtonAddSprint}>
				<button onClick={()=>{setOpenModalSprint(true)}} className={styles.buttonAddSprint}>Agregar Sprint</button>
			</div>
		</div>
		{openModalSprint && (
			<ModalSprint handleCloseModalSprint={handleCloseModalSprint} />
		)}
		
		</>
	);
};
