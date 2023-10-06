const eventModel = require('../models/eventModel')

exports.findAllEvents = async () => {
   return await eventModel.find().populate('category').populate("tickets").populate("organisator");
}

exports.getById = async (id) => {
   return await eventModel.findById(id).populate('category').populate("tickets").populate("organisator")
}

exports.createEvent = async (event) => {
   const newEvent = new eventModel(event);
   return await newEvent.save();
} 

exports.updateEvent = async (id, event) => {
   await eventModel.findByIdAndUpdate(id, event)
   const upEvent = await eventModel.findById(id)
   return upEvent;
}

exports.removeEvent = async (id) => {
   return await eventModel.findByIdAndDelete(id)
}