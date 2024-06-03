import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import {AuthProvider} from "./utils/useAuth.tsx";
// import Home from './pages/Home';
// import About from './pages/About';

const AppRoutes: React.FC = () => {
   return (
	 <AuthProvider>
		<Routes>
		   
		   {/* <Route path="/" element={<Home />} /> */}
		   <Route path="/login" element={<Login/>}/>
		   <Route path="/register" element={<Register/>}/>
		   {/* <Route path="/about" element={<About />} /> */}
		</Routes>
	 </AuthProvider>
   
   );
};

export default AppRoutes;