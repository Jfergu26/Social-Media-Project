const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');


const Post = require('./models/Post');
//import mongodb information from config file
const { MONGODB } = require('./config.js');

// ! means it is required so it has to return a string
// https://www.apollographql.com/docs/tutorial/schema/

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`
// for each query,mutation, etc they need a corresponding resolver
// ^^ Query needs a Query resolver below to return some logic

const resolvers = {
    Query: {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
        // async documentation
        async getPosts(){
            try{
                const posts = await Post.find() // returns all posts if none is declared
                return posts;
            }catch(err){
                throw new Error(err);
            }

        }
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


   