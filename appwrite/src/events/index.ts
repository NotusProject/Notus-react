import { AppwriteEventHandler } from "@vynxc/appwrite-utils";
import { Client, Databases, type Models, ID } from "node-appwrite";
import Bun from "bun";
import { database } from "../appwrite";

const eventHandler = new AppwriteEventHandler();

eventHandler.on("users.*.delete", async (event, { log, req, res }) => {
	const data = req.body as Models.User<Models.Preferences>;
	const userID = data.$id;
	await database.deleteDocument("default", "users", userID);
	return res.json({ message: "User deleted" });
});

eventHandler.on("users.*.create", async (event, { log, req, res }) => {
	const data = req.body as Models.User<Models.Preferences>;
	const avatar = `https://api.dicebear.com/8.x/adventurer/png?seed=${data.name}&glasses=variant01&glassesProbability=50`;
	const model: User = {
		id: data.$id,
		username: data.name,
		avatar,
	};

	await database.createDocument("default", "users", ID.unique(), model);
	return res.json({ message: "User created" });
});

export default eventHandler;

interface User {
	id: string;
	username: string;
	avatar: string;
}
