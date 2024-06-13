import {Button} from "../components/common/button.tsx";
import {MicrophoneIcon, PaperAirplaneIcon, PaperClipIcon,} from "@heroicons/react/20/solid";
import {Textarea} from "../components/common/textarea.tsx";
import {useLoaderData} from "react-router-dom";
import {Message as MessageType} from "../types";
import useAutoResizeTextarea from "../hooks/useAutoResizeTextarea.tsx";
import {Chats} from "../types/appwrite/chats.ts";
import {Messages} from "../types/appwrite/messages.ts";
import {api, client} from "../services/appwrite/appwrite.ts";
import {useEffect, useRef, useState} from "react";
import Message from "../components/Chat/Message.tsx";
import {UserActionBar} from "../components/Chat/UserActionBar.tsx";


export function Chat() {
	const textareaRef = useAutoResizeTextarea(6);
	let {messages: initialMessages, data} = useLoaderData() as {
		messages: Messages[];
		data: Chats;
	};
	const [messages, setMessages] = useState<Messages[]>(initialMessages);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		const unsubscribe = client.subscribe(
			 "databases.default.collections.messages.documents",
			 (event: { payload: Messages }) => {
				 console.log(event);
				 setMessages((prevMessages) => {
					 const updatedMessages = [...prevMessages, event.payload];
					 setTimeout(() => {
						 scrollToBottom();
					 }, 0);
					 return updatedMessages;
				 });
			 }
		);
		
		return () => {
			unsubscribe();
		};
	}, []);
	
	useEffect(() => {
		scrollToBottom();
	}, []);
	
	const scrollToBottom = () => {
		chatContainerRef.current?.scrollTo({
			top: chatContainerRef.current.scrollHeight,
		});
	};
	
	
	
	const list: MessageType[] = messages.map((doc) => ({
		username: doc.sender.username,
		content: doc.content,
		avatar: doc.sender.avatar,
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





