import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../common/table.tsx";
import {Avatar} from "../../common/avatar.tsx";
import {Badge} from "../../common/badge.tsx";
import {Button} from "../../common/button.tsx";
import {ChatBubbleLeftIcon} from "@heroicons/react/20/solid";
import {Dropdown, DropdownButton, DropdownItem, DropdownMenu} from "../../common/dropdown.tsx";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/solid";
import {User} from "../../../utils/types/types.ts";

/**
 * Represents a user.
 *
 * @interface
 */


/**
 * Renders a table of users with their name, status, and additional actions.
 *
 * @param {Array} users - An array of user objects.
 * @param {string} users[].avatarUrl - The URL of the user's avatar.
 * @param {string} users[].displayName - The user's display name.
 * @param {string} users[].bio - The user's bio.
 * @param {boolean} users[].online - Indicates whether the user is online (true) or offline (false).
 *
 * @return {JSX.Element} The rendered table of users.
 */
export default function UsersTable({users}: { users: User[] }) {
	return (
		 <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
			 <TableHead>
				 <TableRow>
					 <TableHeader>Name</TableHeader>
					 <TableHeader>Status</TableHeader>
					 <TableHeader></TableHeader>
				 </TableRow>
			 </TableHead>
			 <TableBody>
				 {users.map((user) => (
						<TableRow key={user.displayName}>
							<TableCell>
								<div className="flex items-center gap-4">
									<Avatar src={user.avatarUrl} className="size-12"/>
									<div>
										<div className="font-medium">{user.displayName}</div>
										<div className="text-zinc-500">
											<a href="#" className="hover:text-zinc-700">
												{user.bio}
											</a>
										</div>
									</div>
								</div>
							</TableCell>
							
							<TableCell>
								{user.online ? <Badge color="lime">Online</Badge> : <Badge color="zinc">Offline</Badge>}
							</TableCell>
							<TableCell className="text-zinc-500 space-x-2 flex justify-end">
								<div className="-mx-3 my-1.5 sm:-mx-2.5 flex gap-4">
									<Button color="light">
										<ChatBubbleLeftIcon/>
									</Button>
									<Dropdown>
										<DropdownButton color="light" aria-label="More options">
											<EllipsisHorizontalIcon/>
										</DropdownButton>
										<DropdownMenu anchor="bottom end">
											<DropdownItem>Start Voice Call</DropdownItem>
											<DropdownItem>Start Video Call</DropdownItem>
											<DropdownItem className="!text-red-300 ">Remove Friend</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								
								</div>
							</TableCell>
						
						</TableRow>
				 ))}
			 </TableBody>
		 </Table>
	)
}