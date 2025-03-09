// LAYOUTS
import DarkLayout from "~/layouts/MainLayout";
// COMPONENTS
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "~/pages/Home";
import CreateandRegister from "~/pages/CreateandRegister";

// import CreateandRegister from "~/pages/CreateandRegister";

window.process = {
	env: {},
};


function App() {
	return (
		<Router>
			<DarkLayout>
				<Routes>
					<Route element={<Home />} path="/" />
					<Route element={<CreateandRegister />} path="/integrate" />


				</Routes>
			</DarkLayout>
		</Router>
	);
}

export default App;
