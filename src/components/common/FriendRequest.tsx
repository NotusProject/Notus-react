import {Fragment, useState} from "react";
import {Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/20/solid";
import {Button} from "./button.tsx";
import {Users} from "../../types/appwrite/users.ts";

export default function FriendRequest({ user }: { user: Users }) {
	const [show, setShow] = useState(true);
	
	return (
		<>
			{/* Global notification live region, render this permanently at the end of the document */}
			<div
				aria-live="assertive"
				className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
			>
				<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
					{/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
					<Transition
						show={show}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						enterTo="translate-y-0 opacity-100 sm:translate-x-0"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="pointer-events-auto w-full max-w-sm rounded-lg border border-zinc-800 bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950 shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="p-4">
								<div className="flex items-start">
									<div className="flex-shrink-0 pt-0.5">
										<img
											className="h-10 w-10 rounded-full"
											src={user.avatar}
											alt=""
										/>
									</div>
									<div className="ml-3 w-0 flex-1">
										<p className="text-sm font-medium text-zinc-50">
											{user.username}
										</p>
										<p className="mt-1 text-sm text-zinc-300">
											Sent you an invite to connect.
										</p>
										<div className="mt-4 flex gap-4">
											<Button color={"violet"}>Accept</Button>
											<Button>Decline</Button>
										</div>
									</div>
									<div className="ml-4 flex flex-shrink-0">
										<button
											type="button"
											className="inline-flex rounded-md  text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											onClick={() => {
												setShow(false);
											}}
										>
											<span className="sr-only">Close</span>
											<XMarkIcon className="h-5 w-5" aria-hidden="true" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	);
}
