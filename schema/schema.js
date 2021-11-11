const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _ = require('lodash');

//To be delated
var Books = [
    { id: "1", name: "Libro 1", genre: "Cucina" },
    { id: "2", name: "Via col vento", genre: "Storico" },
    { id: "3", name: "Sulle ali della liberta'", genre: "Romantico" }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})



console.log(GraphQLString)

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: BookType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                //code to query data
                return _.find(Books, { id: args.id })
            }
        }
    }
})

console.log(RootQuery)

module.exports = new GraphQLSchema({
    query: RootQuery
})