import { Input, InputGroup } from "../../common/input.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button } from "../../common/button.tsx";
import { FormEvent, useState } from "react";
import { api } from "../../../services/appwrite.ts";

export function AddFriends() {
	const [username, setUsername] = useState("");
	const handleAddFriend = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (username !== "") {
			const res = await api.friends
				.request({
					username: username,
				})
				.get();

			console.log(res);
		}
	};
	const handleInputChange = (event: any) => {
		setUsername(event.target.value);
	};
	return (
		<div className="mx-auto w-full">
			<div>
				<form onSubmit={handleAddFriend} className="">
					<InputGroup className="!flex relative">
						<MagnifyingGlassIcon />
						<Input
							className=""
							name="username"
							placeholder="Search&hellip;"
							aria-label="Search"
							onChange={handleInputChange}
							defaultValue={username}
						/>
						<Button
							type="submit"
							color="lime"
							className={`!absolute h-7 mt-1 w-32 inset-y-0 right-2 gap-x-1.5 text-sm font-semibold leading-6 ${
								username !== "" ? "!opacity-100" : "!opacity-50"
							} `}
						>
							Send invite
						</Button>
					</InputGroup>
				</form>
			</div>
		</div>
	);
}
