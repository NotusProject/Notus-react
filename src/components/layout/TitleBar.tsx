import {WindowTitlebar} from "tauri-controls";

export default function Titlebar() {
    return (
        <WindowTitlebar
            controlsOrder="platform"
            className="h-13 rounded-t-lg sm:hidden md:flex   shadow   "
            windowControlsProps={{
                platform: 'windows',

            }}
            data-tauri-drag-region
        >
            <div
                className="flex w-full  items-center justify-center"
                data-tauri-drag-region
            >
                Notus
            </div>
        </WindowTitlebar>
    )
}
