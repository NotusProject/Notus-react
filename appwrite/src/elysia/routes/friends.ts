import Elysia, { t } from "elysia";
import { Permission, Role, Query, ID } from "node-appwrite";
import { getIdFromUsername, database, logger } from "../../appwrite";

export const friends = new Elysia({ prefix: "friends" })
	.onError((error) => {
		logger.error(error);
		return { message: "Internal server error" };
	})
	.get(
		"/request/:username",
		async ({ params, set, request }) => {
			const executor = request.headers.get("x-appwrite-user-id");
			const friend = await getIdFromUsername(params.username);

			if (friend === executor) {
				set.status = "Bad Request";
				return { message: "User cannot be friend with themselves" };
			}

			const readWrite = (id: string) => [
				Permission.write(Role.user(id)),
				Permission.read(Role.user(id)),
			];
			if (!friend || !executor) {
				set.status = "Not Found";
				return { message: "User not found" };
			}
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
				[...readWrite(executor), ...readWrite(friend)]
			);
			logger.log("Friend request sent");

			return { message: "Friend request sent" };
		},
		{
			response: t.Object({ message: t.String() }),
		}
	)
	.get(
		"/accept/:username",
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
			const friendRequest = friendDocument.documents[0];
			if (friendRequest.status === "ACCEPTED") {
				set.status = "Bad Request";
				return { message: "User is already a friend" };
			}
			if (friendRequest.user !== executor) {
				set.status = "Bad Request";
				return { message: "Cannot accept friend request for another user" };
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
	.get("/reject/:username", async ({ params, headers, set }) => {
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
