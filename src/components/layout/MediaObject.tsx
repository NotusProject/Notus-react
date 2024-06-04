import {Avatar} from "../common/avatar.tsx";

export function MediaObject({initials}: { initials: string }) {
    return (
        <a className="flex cursor-pointer group items-center gap-4">
            <Avatar initials={initials} className="size-8 bg-zinc-500"/>
            <div>
                <div className="font-medium text-sm">{'Vynxc'}</div>
                <div className="text-zinc-400">
                    <span className="group-hover:text-zinc-500 text-xs line-clamp-1">
                        {'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                    </span>
                </div>
            </div>
        </a>
    );
}
