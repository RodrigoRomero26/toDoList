import { SprintCard } from "../SprintCard/SprintCard";
import styles from "./ListSprints.module.css";
export const ListSprints = () => {
	return (
		<div className={styles.containerPrincipalListSprints}>
			<div className={styles.containerTitleListSprints}>
				<h1>Sprints</h1>
			</div>
			<div className={styles.containerSprints}>
				<SprintCard />

			</div>
			<div className={styles.containerButtonAddSprint}>
				<button className={styles.buttonAddSprint}>Agregar Sprint</button>
			</div>
		</div>
	);
};
