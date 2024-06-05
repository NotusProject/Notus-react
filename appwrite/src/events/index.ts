import { AppwriteEventHandler } from "@vynxc/appwrite-utils";

const eventHandler = new AppwriteEventHandler();

eventHandler.on("databases . *", async (event, { log, res }) => {
	log(event);
	return res.json({ message: "Account created" });
});
export default eventHandler;
