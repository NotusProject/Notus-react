import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./routes.tsx";
import Layout from "./components/layout/Layout.tsx";

// import Layout from './components/layout/Layout';

function App() {
   return (
	   <Layout>
	 <Router>
		{/*<Layout>*/}


		 <Routes/>
		{/*</Layout>*/}
	 </Router>
	   </Layout>
   );
}

export default App;
