import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RoutesConfig from "./routes.tsx";
import Layout from "./components/layout/Layout.tsx";
import Titlebar from "./components/layout/TitleBar.tsx";
import Login from './pages/Login';
import Register from './pages/Register';
import {AuthProvider} from "./utils/useAuth.tsx";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Titlebar/>
				<Routes>
					<Route path="/login" element={<Login/>}/>
					<Route path="/register" element={<Register/>}/>
					<Route path="*" element={
						<Layout>
							<RoutesConfig/>
						</Layout>
					}/>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
