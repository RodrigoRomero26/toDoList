import { useNavigate } from "react-router-dom";
import { SprintList } from "../SprintList/SprintList";
import styles from "./Aside.module.css";
import { sprintStore } from "../../../store/sprintStore";
export const Aside = () => {
	const navigate = useNavigate();
  const setActiveSprintForRoute = sprintStore((state) => state.setActiveSprintForRoute);
  const setActiveSprint = sprintStore((state) => state.setActiveSprint);
	return (
		<div className={styles.aside}>
			<div className={styles.asideButton}>
				<button
					onClick={() => {
						navigate("/");
            setActiveSprintForRoute(null);
            setActiveSprint(null);
					}}>
					Backlog
				</button>
			</div>
			<div className={styles.asideSprints}>
				<SprintList />
			</div>
		</div>
	);
};
