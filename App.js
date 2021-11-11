const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

var password = 'admin';
mongoose.connect(`mongodb+srv://grapql_user:${password}@cluster0.gdknt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
mongoose.connection.once('open', () => {
    console.log('Connected to database')
});

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Hello World')
})