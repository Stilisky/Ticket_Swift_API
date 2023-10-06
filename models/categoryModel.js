const mongoose = require('mongoose')

const categSchema = mongoose.Schema({
   name: {type: String, require: true},
   events: [{type: mongoose.Schema.Types.ObjectId, ref:'Event'}],
})
module.exports = mongoose.model('Category', categSchema)