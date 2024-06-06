// App.tsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import RoutesConfig from './routes';
import Layout from './components/layout/Layout';
import Titlebar from './components/layout/TitleBar';
import Login from './pages/Login';
import Register from './pages/Register';

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
