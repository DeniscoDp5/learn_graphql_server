const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
} = graphql;
const _ = require('lodash');

//To be delated
var Books = [
    { id: "1", name: "Libro 1", genre: "Cucina", authorID: "1" },
    { id: "2", name: "Via col vento", genre: "Storico", authorID: "1" },
    { id: "3", name: "Sulle ali della liberta'", genre: "Romantico", authorID: "2" }
]

var authors = [
    { name: 'Dario Franchi', age: 12, id: "1" },
    { name: 'Massimiliano Laguna', age: 33, id: "2" }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorID: {
            type: AuthorType,
            resolve: (parent, args) => {
                return _.find(authors, { id: parent.authorID })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

console.log(GraphQLString)

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                //code to query data
                return _.find(Books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return _.find(authors, { id: args.id })
            }
        }
    }
})

console.log(RootQuery)

module.exports = new GraphQLSchema({
    query: RootQuery
})