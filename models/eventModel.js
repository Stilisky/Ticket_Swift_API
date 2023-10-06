const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
   name: {type: String, require: true},
   date: {type: Date, require: true},
   lieu: {type: String, require: true},
   heure: {type: String, require: true},
   description: {type: String, require: true},
   code_Staff: {type: String, require: true},
   price: {type: Number, require:true},
   performers: [{type:String}],
   sponsors: [{type: String}],
   participants: {type: Number},
   photo: {type: String},
   users: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
   category: {type: mongoose.Schema.Types.ObjectId, ref:'Category'},
   tickets: [{type: mongoose.Schema.Types.ObjectId, ref:'Ticket'}],
   organisator: {type: mongoose.Schema.Types.ObjectId, ref:'Organisator'},
})
module.exports = mongoose.model('Event', eventSchema)