import Elysia, { t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { database, getIdFromUsername, logger } from "../appwrite";
import { ID, Permission, Query, Role } from "node-appwrite";
const app = new Elysia()
	.use(swagger())
	.use(
		cors({
			credentials: true,
			origin: "localhost:1420",
		})
	)
	.get(
		"/friends/request/:username",
		async ({ params, headers, set }) => {
			const executor = headers["x-appwrite-user-id"];
			const friend = await getIdFromUsername(params.username);

			const write = (id: string) => Permission.write(Role.user(id));
			if (!friend || !executor) {
				set.status = "Not Found";
				return { message: "User not found" };
			}
			// Check if user is already a friend
			const friendRequest = await database.listDocuments("default", "friends", [
				Query.equal("user", executor),
				Query.equal("friend", friend),
			]);
			if (friendRequest.documents.length > 0) {
				set.status = "Bad Request";
				return { message: "User is already a friend" };
			}

			await database.createDocument(
				"default",
				"friends",
				ID.unique(),
				{
					user: executor,
					friend: friend,
				},
				[write(executor), write(friend)]
			);
			return { message: "Friend request sent" };
		},
		{
			response: t.Object({ message: t.String() }),
		}
	)
	.get(
		"/friends/accept/:username",
		async ({ params, headers, set }) => {
			const friend = await getIdFromUsername(params.username);
			const executor = headers["x-appwrite-user-id"];

			if (!friend) {
				set.status = "Not Found";
				return { message: "User not found" };
			}
			if (!executor) {
				set.status = "Unauthorized";
				return { message: "Not logged in" };
			}
			const friendDocument = await database.listDocuments(
				"default",
				"friends",
				[Query.equal("user", executor), Query.equal("friend", friend)]
			);
			if (friendDocument.documents.length === 0) {
				set.status = "Not Found";
				return { message: "User is not a friend" };
			}
			await database.updateDocument(
				"default",
				"friends",
				friendDocument.documents[0].$id,
				{
					status: "accepted",
				}
			);
			return { message: "Friend request accepted" };
		},
		{
			response: t.Object({ message: t.String() }),
		}
	)
	.get("/friends/remove/:username", async ({ params, headers, set }) => {
		const friend = await getIdFromUsername(params.username);
		const executor = headers["x-appwrite-user-id"];
		logger.log("executor: " + executor ?? "null executor");
		if (!friend) {
			set.status = "Not Found";
			return { message: "User not found" };
		}
		if (!executor) {
			set.status = "Unauthorized";
			return { message: "Not logged in" };
		}
		const friendDocument = await database.listDocuments("default", "friends", [
			Query.equal("user", executor),
			Query.equal("friend", friend),
		]);
		if (friendDocument.documents.length === 0) {
			set.status = "Not Found";
			return { message: "User is not a friend" };
		}
		await database.deleteDocument(
			"default",
			"friends",
			friendDocument.documents[0].$id
		);
		return { message: "User removed" };
	});
export default app;
export type App = typeof app;
