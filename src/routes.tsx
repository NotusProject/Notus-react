import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import FriendsPage from "./pages/Friends.tsx";

function Home() {
	return (
		<div className={"h-[999px]"}>
			<div className={"h-96"}>dd</div>
			<div className={"h-96"}>dd</div>
			<div className={"h-96"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
			<div className={"h-96 bg-red-500"}>dd</div>
		</div>
	);
}

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<Home />} />
				
				<Route path="/friends" element={
					<Suspense fallback={<div>Loading...</div>}>
						
						<FriendsPage/>
					</Suspense>
				}/>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
