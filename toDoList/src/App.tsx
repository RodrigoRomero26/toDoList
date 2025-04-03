import { Navigate, Route, Routes } from "react-router-dom";
import { BacklogScreen } from "./components/screens/BacklogScreen/BacklogScreen";
import { SprintScreen } from "./components/screens/SprintScreen/SprintScreen";
import { sprintStore } from "./store/sprintStore";

function App() {
	const activeSprintForRoute = sprintStore((state) => state.activeSprintForRoute);

	return (
		<Routes>
			<Route path="/" element={<Navigate to="/backlog" replace />} />
			<Route path="/backlog" element={<BacklogScreen />} />
			<Route
				path={`/sprint/${activeSprintForRoute?.nombre
					.replace(/\s+/g, "-")
					.toLowerCase()}`}
				element={<SprintScreen />}
			/>
		</Routes>
	);
}

export default App;
