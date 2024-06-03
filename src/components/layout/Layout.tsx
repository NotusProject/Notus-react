import Titlebar from "./TitleBar.tsx";

const Layout = ({children}) => {
    return (
        <div className={'overflow-hidden'}>
            {/* Header */}
            <Titlebar/>

            {/* Main Content */}
            <main id={'main'} className={'mt-13 h-screen overflow-y-auto'}>{children}</main>

            {/* Footer */}
            {/*<footer>*/}
            {/*    <p>&copy; 2023 My React App</p>*/}
            {/*</footer>*/}
        </div>
    );
};

export default Layout;
