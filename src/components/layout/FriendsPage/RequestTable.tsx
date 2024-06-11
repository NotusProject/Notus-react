import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../common/table.tsx";
import {Avatar} from "../../common/avatar.tsx";
import {Button} from "../../common/button.tsx";

export default function RequestTable({users}: { users: any[] }) {
	console.log(users);
	return (
		 <Table className="">
			 <TableHead>
				 <TableRow>
					 <TableHeader>Friend Request - {users.length}</TableHeader>
					 <TableHeader></TableHeader>
				 </TableRow>
			 </TableHead>
			 <TableBody>
				 {users.map((user) => (
						<TableRow key={user.$id}>
							<TableCell>
								<div className="flex items-center gap-4">
									<Avatar src={user.avatar} className="size-12"/>
									<div>
										<div className="font-medium">{user.username}</div>
										<div className="text-zinc-500">
											<a href="#" className="hover:text-zinc-700">
												{user.bio}
											</a>
										</div>
									</div>
								</div>
							</TableCell>
							
							
							<TableCell className="text-zinc-500 space-x-2 flex justify-end">
								<div className="-mx-3 my-1.5 sm:-mx-2.5 flex gap-4">
									<Button color="zinc">
										Accept
									</Button>
									<Button outline={true}>
										Reject
									</Button>
								</div>
							</TableCell>
						
						</TableRow>
				 ))}
			 </TableBody>
		 </Table>
	)
}
