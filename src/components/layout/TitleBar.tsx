import {WindowTitlebar} from "tauri-controls";

export default function Titlebar() {
    return (
        <WindowTitlebar
            controlsOrder="platform"
            className="h-13 rounded-t-lg sm:hidden md:flex   shadow border-b  border-b-zinc-900"
            windowControlsProps={{
                platform: 'windows',
            }}
            data-tauri-drag-region
        >
            <div className="ml-3 flex items-center" data-tauri-drag-region>
                {/*<LogoSvg/>*/}
            </div>

            <div
                className="flex w-full items-center justify-center"
                data-tauri-drag-region
            >
                Title
            </div>
        </WindowTitlebar>
    )
}


// const LogoSvg = () => (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-sailboat mr-2 text-sky-600/70 dark:text-sky-300/70"
//     >
//         <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"/>
//         <path d="M21 14 10 2 3 14h18Z"/>
//         <path d="M10 2v16"/>
//     </svg>
// )
