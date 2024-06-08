import './App.pcss';

import '@fontsource/geist-sans/300.css';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/800.css';
import '@fontsource/geist-sans/900.css';
import ReactDOM from "react-dom/client";
import {StrictMode} from "react";
import App from "./App.tsx";
import {RecoilRoot,} from 'recoil';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	 <StrictMode>
		 <RecoilRoot>
			 <App/>
		 </RecoilRoot>
	 </StrictMode>
);
