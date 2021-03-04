const postsResolvers = require('../../models/Post')
const usersResolvers  = require('./users')
const commentsResolvers  = require('./users')

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}