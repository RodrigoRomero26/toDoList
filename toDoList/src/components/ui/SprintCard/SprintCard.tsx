import styles from "./SprintCard.module.css";
export const SprintCard = () => {
	return (
		<div className={styles.sprintCard}>
			<div className={styles.sprintCardData}>
				<h2>Sprint 1</h2>
				<p>Inicio: 01/01/2021</p>
				<p>Cierre: 15/01/2021</p>
			</div>
			<div className={styles.sprintCardActions}>
				<button>
					<span className="material-symbols-outlined">visibility</span>
				</button>
				<button>
					<span className="material-symbols-outlined">edit</span>
				</button>
				<button>
					<span className="material-symbols-outlined">delete</span>
				</button>
			</div>
		</div>
	);
};
