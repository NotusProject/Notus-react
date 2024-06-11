import {Navbar, NavbarItem, NavbarSection, NavbarSpacer,} from "../components/common/navbar.tsx";
import {Button} from "../components/common/button.tsx";
import {
	EllipsisVerticalIcon,
	MagnifyingGlassIcon,
	MicrophoneIcon,
	PaperAirplaneIcon,
	PaperClipIcon,
	PencilIcon,
	PhoneIcon,
	TrashIcon,
	VideoCameraIcon,
} from "@heroicons/react/20/solid";
import {Avatar} from "../components/common/avatar.tsx";
import {Badge} from "../components/common/badge.tsx";
import {Textarea} from "../components/common/textarea.tsx";
import {useLoaderData} from "react-router-dom";
import {Message as MessageType} from "../types";
import {useRecoilValue} from "recoil";
import {friendsAtom, userAtom} from "../utils/atoms.ts";
import useAutoResizeTextarea from "../hooks/useAutoResizeTextarea.tsx";
import {Chats} from "../types/appwrite/chats.ts";
import {Messages} from "../types/appwrite/messages.ts";
import {api, client} from "../services/appwrite/appwrite.ts";
import {useEffect, useRef, useState} from "react";

export function Chat() {
	const textareaRef = useAutoResizeTextarea(6);
	let {messages: initialMessages, data} = useLoaderData() as {
		messages: Messages[];
		data: Chats;
	};
	const currentUser = useRecoilValue(userAtom);
	const friends = useRecoilValue(friendsAtom);
	const [messages, setMessages] = useState<Messages[]>(initialMessages);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		const unsubscribe = client.subscribe(
			 "databases.default.collections.messages.documents",
			 (event: { payload: Messages }) => {
				 console.log(event);
				 setMessages((prevMessages) => [...prevMessages, event.payload]);
			 }
		);
		
		return () => {
			unsubscribe();
		};
	}, []);
	
	useEffect(() => {
		scrollToBottom();
	}, [messages]);
	
	const scrollToBottom = () => {
		chatContainerRef.current?.scrollTo({
			top: chatContainerRef.current.scrollHeight,
			behavior: 'smooth',
		});
	};
	
	if (!currentUser) return null;
	
	const friendsId = (data.users as string[]).find(
		 (id) => id !== currentUser.$id
	)!;
	const friend = friends.find((f) => f.$id === friendsId);
	
	if (!friend) return null;
	
	const list: MessageType[] = messages.map((doc) => ({
		username:
			 currentUser.$id != doc.sender ? friend.username : currentUser.name,
		content: doc.content,
		avatar: friend.avatar,
		date: new Date(doc.$createdAt),
	}));
	
	async function sendMessage() {
		const chatId = data.$id;
		const message = textareaRef.current?.value;
		if (!message) return;
		await api.chats.messages.send.post({chatId, content: message});
		console.log("Message sent");
	}
	
	return (
		 <section className="h-screen grid grid-rows-[auto_1fr_auto] pb-7">
			 <UserActionBar/>
			 <div ref={chatContainerRef} className="overflow-y-auto py-4">
				 {list.map((message, i) => (
						<Message key={i} {...message} />
				 ))}
			 </div>
			 <div className="p-6 px-2">
				 <Textarea
						className="group"
						resizable={false}
						aria-label="Description"
						name="description"
						ref={textareaRef}
				 >
					 <div className="flex items-center z-50 gap-4 absolute top-1/2 right-2 -translate-y-1/2">
						 <div className="flex items-center gap-2 border-r border-zinc-300 dark:border-zinc-700 pr-4">
							 <Button plain={true}>
								 <MicrophoneIcon className="!size-5 fill-zinc-500"/>
							 </Button>
							 <Button plain={true} className="!text-zinc-500">
								 <PaperClipIcon className="!size-5 fill-zinc-500"/>
							 </Button>
						 </div>
						 <Button
								plain={true}
								onClick={sendMessage}
								className="!text-zinc-500"
						 >
							 <PaperAirplaneIcon className="!size-5 fill-violet-600 group-hover:text-red-500"/>
						 </Button>
					 </div>
				 </Textarea>
			 </div>
		 </section>
	);
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/n74y60nxd0B
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function Message({
	avatar,
	username,
	content,
	date,
}: MessageType) {
	return (
		<div className="flex items-start gap-4 w-full px-2  group py-2 hover:bg-zinc-800/30 rounded-md relative">
			<Avatar src={avatar} className="!size-8"></Avatar>
			<div className="flex-1 space-y-1">
				<div className="flex items-center gap-4 relative">
					<div className="font-medium">{username}</div>
					<div className="text-xs text-gray-500 dark:text-gray-400">
						{date.toLocaleString()}
					</div>
				</div>
				<section className="group-hover:flex items-center hidden gap-2  absolute right-0 -top-4 bg-zinc-900 rounded-lg border border-zinc-800 p-1 ">
					<Button plain={true} className="!py-0">
						<PencilIcon className="!size-4 fill-white" />
					</Button>{" "}
					<Button plain={true} className="!py-0">
						<TrashIcon className="!size-4 fill-red-600" />
					</Button>{" "}
					<Button plain={true} className="!py-0">
						<EllipsisVerticalIcon className="!size-4 fill-white" />
					</Button>
				</section>
				<div className="text-sm text-gray-700 dark:text-gray-300 leading-normal">
					{content}
				</div>
			</div>
		</div>
	);
}

function UserActionBar() {
	return (
		<Navbar className="border-zinc-800/80 border-b ">
			<Button plain={true} href="/" aria-label="Home">
				<MediaObject initials={"VY"} />
			</Button>
			<NavbarSpacer />
			<NavbarSection>
				<NavbarItem aria-label="Search">
					<PhoneIcon />
				</NavbarItem>
				<NavbarItem aria-label="Inbox">
					<VideoCameraIcon />
				</NavbarItem>
				<NavbarItem aria-label="Search">
					<MagnifyingGlassIcon />
				</NavbarItem>
			</NavbarSection>
		</Navbar>
	);
}

export function MediaObject({ initials }: { initials: string }) {
	return (
		<button className="flex items-center justify-between w-full text-left gap-4">
			<div className="flex items-center gap-2">
				<Avatar initials={initials} className="size-8 bg-zinc-500" />
				<div className="flex gap-2 justify-between">
					<div className="font-medium text-sm">{"Vynxc"}</div>
					<Badge color="lime" className="!bg-lime-400/30 !py-0 !text-xs">
						Online
					</Badge>
				</div>
			</div>
		</button>
	);
}
