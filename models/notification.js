const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
   type: {type: String},
   price: {type: Number, require: true},
   code_Staff: {type: String},
   user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
   event: {type: mongoose.Schema.Types.ObjectId, ref:'Event'},
   payment: {type: mongoose.Schema.Types.ObjectId, ref:'Payment'},
})
module.exports = mongoose.model('Ticket', ticketSchema)