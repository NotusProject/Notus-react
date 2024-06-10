import { Client, Account, Functions, Databases } from "appwrite";
import { App } from "../../../appwrite/src/elysia";
import { treaty } from "@vynxc/appwrite-elysia-treaty";

const client = new Client()
	.setEndpoint("https://appwrite.wasimhub.dev/v1")
	.setProject("notus");
const functions = new Functions(client);

const api = treaty<App>(functions, "666260770026f0c55ce6");

const account = new Account(client);

const database = new Databases(client);

export { client, account, api, database };
