import { AppwriteEventHandler } from "@vynxc/appwrite-utils";
import { type Models, ID } from "node-appwrite";
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
	const avatar = `https://api.dicebear.com/8.x/bottts-neutral/png?seed=${data.name}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
	const model: User = {
		username: data.name,
		avatar,
	};

	await database.createDocument("default", "users", data.$id, model);
	return res.json({ message: "User created" });
});

export default eventHandler;

interface User {
	username: string;
	avatar: string;
}
