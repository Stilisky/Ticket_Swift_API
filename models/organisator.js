const mongoose = require('mongoose')

const orgaSchema = mongoose.Schema({
   name: {type: String, require: true},
   country: {type: String, require: true},
   city: {type: String, require: true},
   email: {type: String, require: true},
   password: {type: String, require: true},
   ifu: {type: String},
   roles: [{type: String}],
   events: [{type: mongoose.Schema.Types.ObjectId, ref:'Event'}],
})
module.exports = mongoose.model('Organisator', orgaSchema)