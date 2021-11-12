const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const cors = require('cors');

var password = 'admin';
mongoose.connect(`mongodb+srv://grapql_user:${password}@cluster0.gdknt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
mongoose.connection.once('open', () => {
    console.log('Connected to database')
});

const app = express();

//allow cross-origin
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Hello World')
})