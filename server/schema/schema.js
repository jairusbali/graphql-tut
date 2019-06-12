import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID
} from "graphql";

import _ from "lodash";

const BookType = new GraphQLObjectType({
	name: "Book",
	description: "an awesome book",

	fields: () => ({
		id: {
			type: GraphQLInt
		},
		title: {
			type: GraphQLString
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	description: "an awesome book",

	fields: () => ({
		firstName: {
			type: GraphQLString
		},
		lastName: {
			type: GraphQLString
		},
		email: {
			type: GraphQLString
		},
		id: {
			type: GraphQLID
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQuery",
	description: "RootQuery",

	fields: () => ({
		book: {
			type: BookType,

			// expected argument params for query
			args: {
				id: {
					type: GraphQLID
				}
			},
			// @param parent - for relationships between
			// data
			resolve(parent, args) {
				// code to get data from db/ other source
				console.log(typeof args.id);
				return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,

			args: {
				id: { type: GraphQLID }
			},
			resolve(parents, args) {
				return _.find(authors, { id: args.id });
			}
		}
	})
});

const books = [
	{ title: "asdf", id: "1" },
	{ title: "two", id: "2" },
	{ title: "three", id: "3" }
];

const authors = [
	{ firstName: "First", lastName: "asdf", id: "1" },
	{ firstName: "Second", lastName: "asdf", id: "2" },
	{ firstName: "last", lastName: "asdf", id: "3" }
];

export default new GraphQLSchema({
	query: RootQuery
});
