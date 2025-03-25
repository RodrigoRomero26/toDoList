import styles from "./TaskCard.module.css";

export const TaskCard = () => {
	return (
		<div className={styles.containerPrincipaltaskCard}>
			<div className={styles.taskCardData}>
				<h2>Task 1</h2>
				<p>
					Descripción: Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quisquam, nemo.
				</p>
			</div>
			<div className={styles.taskCardActions}>
				<div>
					<button>
						<span className="material-symbols-outlined">add</span>
					</button>
				</div>
				<div className={styles.taskCardActionsButtons}>
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
		</div>
	);
};
