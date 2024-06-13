import {Message as MessageType} from "../../types";
import {Avatar} from "../common/avatar.tsx";
import {Button} from "../common/button.tsx";
import {ClipboardIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon} from "@heroicons/react/20/solid";
import Markdown from "react-markdown";
import {LinkPreview} from "./LinkCard.tsx";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {nord} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

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
				 <section
						className="group-hover:flex items-center hidden gap-2  absolute right-0 -top-4 bg-zinc-900 rounded-lg border border-zinc-800 p-1 ">
					 <Button plain={true} className="!py-0">
						 <PencilIcon className="!size-4 fill-white"/>
					 </Button>{" "}
					 <Button plain={true} className="!py-0">
						 <TrashIcon className="!size-4 fill-red-600"/>
					 </Button>{" "}
					 <Button plain={true} className="!py-0">
						 <EllipsisVerticalIcon className="!size-4 fill-white"/>
					 </Button>
				 </section>
				 <div className="text-sm text-gray-700 dark:text-gray-300 leading-normal">
					 <Markdown components={{
						 a: LinkPreview,
						 // @ts-ignore
						 code: CodeBlock,
					 }} remarkPlugins={[remarkGfm]}
										 className="prose prose-cyan   prose-zinc dark:prose-invert">{content}</Markdown>
				 
				 </div>
			 </div>
		 </div>
	);
}


const CodeBlock = ({children, className}: { children: string, className: string }) => {
	const match = /language-(\w+)/.exec(className || '');
	const language = match ? match[1] : '';
	
	const copyCode = () => {
		navigator.clipboard.writeText(children);
		alert('Code copied to clipboard!');
	};
	
	return (
		 <div className="relative w-full">
			 <div className="code-block relative w-full">
				 <Button
						plain={true}
						className="!absolute top-1 right-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
						onClick={copyCode}
				 >
					 <ClipboardIcon className="h-4 w-4"/>
				 </Button>
				 <SyntaxHighlighter
						PreTag="div"
						children={String(children).replace(/\n$/, '')}
						language={language}
						style={nord}
				 />
			 </div>
		 </div>
	);
};

