const staffModel = require('../models/staffModel')

exports.findAllStaff = async () => {
   return await staffModel.find().populate('event');
}

exports.createStaff = async (staff) => {
   const code = new staffModel(staff);
   return await code.save();
}

exports.getById = async (id) => {
   return await staffModel.findById(id).populate('event')
}

exports.updateStaff = async (id, staff) => {
   await staffModel.findByIdAndUpdate(id, staff)
   const upEvent = await staffModel.findById(id)
   return upEvent;
}

exports.removeEvent = async (id) => {
   return await staffModel.findByIdAndDelete(id)
}

