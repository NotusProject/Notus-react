import React from 'react';
import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from "./utils/ProtectedRoute.tsx";

function Home() {
	return <div>hello</div>;
}

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route element={<ProtectedRoute/>}>
				<Route path="/" element={<Home/>}/>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
