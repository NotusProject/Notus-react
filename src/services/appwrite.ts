import { Client, Account, Functions } from "appwrite";
import { treaty } from "@vynxc/appwrite-elysia-treaty";
import { App } from "../../appwrite/src/elysia";

const client = new Client()
	.setEndpoint("https://appwrite.wasimhub.dev/v1")
	.setProject("notus");
const functions = new Functions(client);

const api = treaty<App>(functions, "6660df2a00211037c8c4");

const account = new Account(client);

export { client, account, api };
