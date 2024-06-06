import {Avatar} from "../common/avatar.tsx";
import {Badge} from "../common/badge.tsx";

export function MediaObject({initials}: { initials: string }) {
	return (
		 <button className="flex items-center justify-between w-full text-left  py-3 gap-4">
			 <div className="flex items-center gap-4">
				 <Avatar initials={initials} className="size-9 bg-zinc-500"/>
				 <div className="flex flex-col">
					 <div className="font-medium text-sm">{"Vynxc"}</div>
					 <div className="text-zinc-400 text-xs line-clamp-1">
						 {"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
					 </div>
				 </div>
			 </div>
			 <div className="flex flex-col items-end">
				 <div className="text-xs text-zinc-500">6:04</div>
				 <Badge color="violet" className="!bg-violet-400/30 !px-2 !py-0.5 mt-1">
					 1
				 </Badge>
			 </div>
		 </button>
	);
}
