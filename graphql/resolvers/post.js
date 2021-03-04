const { AuthenticationError} = require('apollo-server')

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth')
module.exports = {

    // for each query,mutation, etc they need a corresponding resolver
    // ^^ Query needs a Query resolver below to return some logic
    Query: {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
        // async documentation
        async getPosts(){
            try{
                const posts = await Post.find().sort({ createdAt: -1}) // returns all posts if none is declared
                return posts;
            }catch(err){
                throw new Error(err);
            }

        },
        async getPost(_, { postId }){
            try{
                const post = await Post.findById(postId);
                if(post){
                    return post;
                }else{
                    throw new Error('Post not found')
                }

            }catch(err){
                throw newError(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context){
            const user = checkAuth(context);
            console.log(user);

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
            const post = await newPost.save();

            return post;
        },
        async deletePost(_, { postId }, context){
            const user = checkAuth(context);

            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post Deleted Successfully';
                }
                else{
                    throw new AuthenticationError('Action not allowed');

                }
            }catch(err){
                throw new Error(err);
            }
        }
    }

}