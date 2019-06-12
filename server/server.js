import express from "express";
import graphqlHTTP from "express-graphql";

import schema from "./schema/schema";

const server = express();

server.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
);

server.listen(3000, () => {
	console.log("listening to port 3000");
});
