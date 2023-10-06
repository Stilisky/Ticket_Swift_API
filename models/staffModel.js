const mongoose = require('mongoose')

const staffSchema = mongoose.Schema({
   code: {type: String, require: true},
   event: {type: mongoose.Schema.Types.ObjectId, ref:'Event'},
   organisator: {type: mongoose.Schema.Types.ObjectId, ref:'Organisator'}
})
module.exports = mongoose.model('Staff', staffSchema)