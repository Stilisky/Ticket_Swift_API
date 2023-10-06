const ticketModel = require("../models/ticketModel")

exports.findAllTickets = async () => {
   return await ticketModel.find().populate("event");
}

exports.findTicketById = async (id) => {
   return await ticketModel.findById(id).populate("event")
}

exports.createTicket = async (ticket) => {
   const newTicket = new ticketModel(ticket)
   return await newTicket.save()
}

exports.updateTicket = async (id, ticket) => {
   await ticketModel.findByIdAndUpdate(id, ticket);
   const tik = await ticketModel.findById(id)
   return tik
}

exports.removeTicket = async (id) => {
   return await ticketModel.findByIdAndDelete(id)
}

