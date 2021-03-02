const { model, Schema } = require('mongoose');

// https://mongoosejs.com/docs/api/schema.html Schema documentation
// Everything in Mongoose starts with a Schema. 
// Each schema maps to a MongoDB collection and defines the 
// shape of the documents within that collection.

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
});

module.exports = model('User', UserSchema);