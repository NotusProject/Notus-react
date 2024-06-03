import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm.tsx";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

// import App from "./App.tsx";

function Home() {
   return <LoginForm/>;
}


function About() {
   return (
	 <>
		Link to <Link to="/">Home</Link>
		<h1>About</h1>
	 </>
   )
}

function Contact() {
   return <h1>Contact</h1>;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
	 <Router>
		<Routes>
		   <Route path="/" element={<Home/>}/>
		   <Route path="/about" element={<About/>}/>
		   <Route path="/contact"
				  element={<DevSupport ComponentPreviews={ComponentPreviews}
									   useInitialHook={useInitial}
				  >
					 <Contact/>
				  </DevSupport>}/>
		</Routes>
		{/*<App />*/}
	 </Router>
  </React.StrictMode>
);