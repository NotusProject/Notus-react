import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./routes.tsx";

// import Layout from './components/layout/Layout';

function App() {
   return (
	 <Router>
		{/*<Layout>*/}
		<Routes/>
		{/*</Layout>*/}
	 </Router>
   );
}

export default App;