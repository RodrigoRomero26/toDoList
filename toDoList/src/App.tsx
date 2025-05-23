import { Navigate, Route, Routes } from "react-router-dom";
import { BacklogScreen } from "./components/screens/BacklogScreen/BacklogScreen";
import { SprintScreen } from "./components/screens/SprintScreen/SprintScreen";

function App() {


	return (
		<Routes>
			<Route path="/" element={<Navigate to="/backlog" replace />} />
			<Route path="/backlog" element={<BacklogScreen />} />
			<Route
				path={"/sprint"}
				element={<SprintScreen />}
			/>
		</Routes>
	);
}

export default App;
