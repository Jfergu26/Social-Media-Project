const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');


const Post = require('./models/Post');
//import mongodb information from config file
const { MONGODB } = require('./config.js');

// ! means it is required so it has to return a string

const typeDefs = gql`
    type Query{
        sayHi: String! 
    }
`
// for each query,mutation, etc they need a corresponding resolver
// ^^ Query needs a Query resolver below to return some logic

const resolvers = {
    Query: {
        sayHi: () => 'Hello World'
    }
}

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


   