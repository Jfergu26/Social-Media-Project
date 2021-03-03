const Post = require('../../models/Post');

module.exports = {

    // for each query,mutation, etc they need a corresponding resolver
    // ^^ Query needs a Query resolver below to return some logic
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
    }

}