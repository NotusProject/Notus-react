import {useParams} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {friendsAtom} from "../../utils/atoms.ts";
import {Users} from "../../types";
import {Navbar, NavbarItem, NavbarSection, NavbarSpacer} from "../common/navbar.tsx";
import {Button} from "../common/button.tsx";
import {MagnifyingGlassIcon, PhoneIcon, VideoCameraIcon} from "@heroicons/react/20/solid";
import {Avatar} from "../common/avatar.tsx";
import {Badge} from "../common/badge.tsx";

export function UserActionBar() {
	const params = useParams()
	const friends = useRecoilValue(friendsAtom);
	const currentFriend = friends.find((f) => f.username === params.username) as Users;
	return (
		 <Navbar className="border-zinc-800/80 border-b ">
			 <Button plain={true} href="/" aria-label="Home">
				 <MediaObject friend={currentFriend}/>
			 </Button>
			 <NavbarSpacer/>
			 <NavbarSection>
				 <NavbarItem aria-label="Search">
					 <PhoneIcon/>
				 </NavbarItem>
				 <NavbarItem aria-label="Inbox">
					 <VideoCameraIcon/>
				 </NavbarItem>
				 <NavbarItem aria-label="Search">
					 <MagnifyingGlassIcon/>
				 </NavbarItem>
			 </NavbarSection>
		 </Navbar>
	);
}

function MediaObject({friend}: { friend: Users }) {
	return (
		 <button className="flex items-center justify-between w-full text-left gap-4">
			 <div className="flex items-center gap-2">
				 <Avatar src={friend.avatar} className="size-8 bg-zinc-500"/>
				 <div className="flex gap-2 justify-between">
					 <div className="font-medium text-sm">{friend.username}</div>
					 <Badge color="lime" className="!bg-lime-400/30 !py-0 !text-xs">
						 Online
					 </Badge>
				 </div>
			 </div>
		 </button>
	);
}
