var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date},
});

module.exports = mongoose.model('post', postSchema);