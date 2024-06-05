import { AppwriteEventHandler } from "@vynxc/appwrite-utils";

const eventHandler = new AppwriteEventHandler();

eventHandler.on("account.create", async (event, { log, res }) => {
	log(event);
	return res.json({ message: "Account created" });
});
export default eventHandler;
