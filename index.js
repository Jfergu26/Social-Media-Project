const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
//import mongodb information from config file
const { MONGODB } = require('./config.js');




//set up the apollo server

const server = new ApolloServer({
    typeDefs,
    resolvers
});

//connect to mongoDB database before starting server
//start server at port 5000
// cmd 'node index' in terminal to run server @ port 5000

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000});
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })


   