const catModel = require('../models/categoryModel')

exports.getCategories = async () => {
   return await catModel.find().populate("events")
} 

exports.getCatById = async (catid) => {
   return await catModel.findById(catid).populate("events")
}

exports.saveCat = async (cat) =>{
   const newCat = new catModel(cat);
   return await newCat.save()
}

exports.updateCat = async (id, cat) => {
   return await catModel.findByIdAndUpdate(id, cat)
}

exports.deletCat = async (id) => {
   return await catModel.findByIdAndDelete(id)
}