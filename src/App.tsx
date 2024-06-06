// App.tsx
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {RecoilRoot, useRecoilValue} from 'recoil';
import RoutesConfig from './routes';
import Layout from './components/layout/Layout';
import Titlebar from './components/layout/TitleBar';
import Login from './pages/Login';
import Register from './pages/Register';
import {loadingAtom, userAtom} from "./utils/atoms.ts";

function AuthRoutes() {
	const user = useRecoilValue(userAtom);
	const loading = useRecoilValue(loadingAtom);
	
	if (loading) {
		return <div>Loading...</div>;
	}
	
	return user ? (
		 <Navigate to="/" replace/>
	) : (
		 <>
			 <Route path="/login" element={<Login/>}/>
			 <Route path="/register" element={<Register/>}/>
		 </>
	);
}

function App() {
	return (
		 <RecoilRoot>
			 <Router>
				 <Titlebar/>
				 <Routes>
					 <Route path="/login" element={<Login/>}/>
					 <Route path="/register" element={<Register/>}/>
					 <Route
							path="*"
							element={
								<Layout>
									<RoutesConfig/>
								</Layout>
							}
					 />
				 </Routes>
			 </Router>
		 </RecoilRoot>
	);
}

export default App;
