import {Input, InputGroup} from "../../common/input.tsx";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {Button} from "../../common/button.tsx";

export function AddFriends() {
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
		 
		 </div>
	)
}


