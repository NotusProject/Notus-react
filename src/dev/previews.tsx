import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {SidebarLayout} from "../components/sidebar-layout.tsx";
import Example from "../pages/Login.tsx";
import App from "../App.tsx";

const ComponentPreviews = () => {
   return (
	 <Previews palette={<PaletteTree/>}>
		<ComponentPreview
		  path="/SidebarLayout">
		   <SidebarLayout/>
		</ComponentPreview>
		<ComponentPreview
		  path="/Example">
		   <Example/>
		</ComponentPreview>
		<ComponentPreview
		  path="/ComponentPreviews">
		   <ComponentPreviews/>
		</ComponentPreview>
		<ComponentPreview
		  path="/App">
		   <App/>
		</ComponentPreview>
	 </Previews>
   );
};

export default ComponentPreviews;