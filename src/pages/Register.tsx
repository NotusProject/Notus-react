import {Input, InputGroup} from "../components/common/input.tsx";
import {Field, Label} from "../components/common/fieldset.tsx";
import {
   EnvelopeIcon,
   KeyIcon, UserIcon
} from "@heroicons/react/24/solid";
import {Checkbox, CheckboxField} from "../components/common/checkbox.tsx";
import {Button} from "../components/common/button.tsx";
import {account} from "../services/appwrite.ts";
import {ID} from "appwrite";
import {FormEvent, useRef} from "react";
import {Link} from "react-router-dom";
import Spline3D from "../components/layout/Spline3D.tsx";

export default function Register() {
   const registerForm = useRef<HTMLFormElement>(null);
   
   const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
	  e.preventDefault();
	  const name = registerForm.current?.username?.value;
	  const email = registerForm.current?.email?.value;
	  const password = registerForm.current?.password?.value;
	  
	  try {
		 const response = await account.create(
		   ID.unique(),
		   email,
		   password,
		   name
		 );
		 console.log("Registration successful:", response);
		 // Redirect or perform further actions upon successful registration
	  } catch (error) {
		 console.error("Registration failed:", error);
		 // Handle registration errors appropriately
	  }
   }
   return (
	 <>

		<div
			className="flex relative  z-10 min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">

			<Spline3D/>

			<div className="sm:mx-auto sm:w-full sm:max-w-md">
			  <img
				className="mx-auto h-10 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
				alt="Your Company"
			  />
			  <h2
				  className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight ">
				 Sign in to your account
			  </h2>
		   </div>
		   
		   <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px]">
			  <div
				  className="bg-white dark:bg-zinc-900 px-6 py-10 shadow sm:rounded-lg sm:px-12">
				 <form ref={registerForm} onSubmit={handleRegistration}
					   className="space-y-6">
					<Field>
					   <Label>Display Name</Label>
					   <InputGroup>
						  <UserIcon/>
						  <Input name="usermame"
								 placeholder="JohnDoe"
								 required={true}/>
					   </InputGroup>
					</Field>
					<Field>
					   <Label>Email address</Label>
					   <InputGroup>
						  <EnvelopeIcon/>
						  <Input name="email"
								 placeholder="email@example.com"
								 required={true} aria-label="Email"/>
					   </InputGroup>
					</Field>
					<Field>
					   <Label>Password</Label>
					   <InputGroup>
						  <KeyIcon/>
						  <Input name="password" className={"!focus:ring-0"}
								 required={true} type={"password"}
								 placeholder="Password123"/>
					   </InputGroup>
					</Field>
					
					<div className="flex items-center justify-between">
					   <CheckboxField>
						  <Checkbox color={'violet'} name="remember_me"/>
						  <Label>Remember me</Label>
					   </CheckboxField>
					   
					   
					   <div className="text-sm leading-6">
							 <span
							   className="  ">
								Arleady a user? <Link to="/login"
													  className="text-violet-600 font-medium hover:text-violet-500">Sign In</Link>
							 </span>
					   </div>
					</div>
					
					<div>
					   
					   <Button color={'violet'} type={'submit'}
							   className={'w-full'}>Register</Button>
					</div>
				 </form>
				 
				 <div>
					<div className="relative mt-6">
					   <div className="absolute inset-0 flex items-center"
							aria-hidden="true">
						  <div
							className="w-full border-t border-zinc-300 dark:border-zinc-500"/>
					   </div>
					   <div
						 className="relative flex justify-center text-sm  font-medium leading-6">
						  <span
							className=" rounded-md px-6 text-black bg-zinc-50 dark:bg-zinc-700 dark:text-white">Or continue with</span>
					   </div>
					</div>
					
					<div className="mt-6 grid grid-cols-2 gap-4">
					   <Button>
						  <svg className="h-5 w-5" aria-hidden="true"
							   viewBox="0 0 24 24">
							 <path
							   d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
							   fill="#EA4335"
							 />
							 <path
							   d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
							   fill="#4285F4"
							 />
							 <path
							   d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
							   fill="#FBBC05"
							 />
							 <path
							   d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
							   fill="#34A853"
							 />
						  </svg>
						  <span
							className="text-sm font-semibold leading-6">Google</span>
					   </Button>
					   
					   
					   <Button>
						  <svg className="h-5 w-5 fill-white"
							   aria-hidden="true"
							   fill="currentColor" viewBox="0 0 20 20">
							 <path
							   fillRule="evenodd"
							   d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
							   clipRule="evenodd"
							 />
						  </svg>
						  <span
							className="text-sm font-semibold leading-6">GitHub</span>
					   </Button>
					</div>
				 </div>
			  </div>
		   
		   
		   </div>
		</div>
	 </>
   )
}
