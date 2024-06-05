import {Input, InputGroup} from "../../common/input.tsx";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {Button} from "../../common/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../common/table.tsx";
import {Avatar} from "../../common/avatar.tsx";
import {UserPlusIcon} from "@heroicons/react/24/solid";

export function AddFriends({results}) {
	return (
		 <div className="mx-auto w-full">
			 <div>
				 
				 <form action="#" className="">
					 <InputGroup className="!flex relative">
						 <MagnifyingGlassIcon/>
						 <Input className="" name="search" placeholder="Search&hellip;" aria-label="Search"/>
						 <Button
								type="submit"
								color="lime"
								className="!absolute h-7  !opacity-50 mt-1 w-32 inset-y-0 right-2 gap-x-1.5 text-sm font-semibold leading-6 "
						 >
							 Send invite
						 </Button>
					 </InputGroup>
				 
				 </form>
			 </div>
			 <div className="mt-4">
				 <ComplexExample results={results}/>
			 </div>
		 </div>
	)
}

export function ComplexExample({results}) {
	return (
		 <Table className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
			 <TableHead>
				 <TableRow>
					 <TableHeader>Name</TableHeader>
					 <TableHeader></TableHeader>
				 </TableRow>
			 </TableHead>
			 <TableBody>
				 {results.map((user) => (
						<TableRow key={user.handle}>
							<TableCell>
								<div className="flex items-center gap-4">
									<Avatar src={user.avatarUrl} className="size-12"/>
									<div>
										<div className="font-medium">{user.name}</div>
										<div className="text-zinc-500">
											<a href="#" className="hover:text-zinc-700">
												{user.email}
											</a>
										</div>
									</div>
								</div>
							</TableCell>
							<TableCell className="text-zinc-500 space-x-2 flex justify-end">
								<div className="-mx-3 my-1.5 sm:-mx-2.5 flex gap-4">
									<Button color="zinc">
										<UserPlusIcon/>
										Add Friend
									</Button>
								</div>
							</TableCell>
						
						</TableRow>
				 ))}
			 </TableBody>
		 </Table>
	)
}
