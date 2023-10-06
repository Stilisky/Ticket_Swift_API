const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   username: {type: String, require: true},
   email: {type: String, require: true},
   password: {type: String, require: true},
   age: {type: Number},
   sexe: {type: String},
   roles: [{type: String}],
   events: [{type: mongoose.Schema.Types.ObjectId, ref:'Event'}],
   tickets: [{type: mongoose.Schema.Types.ObjectId, ref:'Ticket'}],
})
module.exports = mongoose.model('User', userSchema)