const orgaModel = require("../models/organisator")

exports.findAllOrga = async () => {
   const organisators=  await orgaModel.find().populate("events")
   const orgs = [];
   organisators.forEach(element => {
      const user = {
         id: element._id,
         name: element.name,
         email: element.email,
         ifu: element.ifu,
         phone: element.phone,
         country: element.country,
         city: element.city,
         roles: element.roles,
         events: element.events
      }
      orgs.push(user)
   });
   return orgs;
}

exports.getOrgaById = async (id) => {
   const org = await orgaModel.findById(id).populate("events")
   const user = {
      id: org._id,
      name: org.name,
      email: org.email,
      ifu: org.ifu,
      phone: org.phone,
      country: org.country,
      city: org.city,
      roles: org.roles,
      events: org.events
   }
   return user;
}

exports.getOrgaByemail = async (email) => {
   const org = await orgaModel.findOne({email})
   if(org){
      return org;
   }else {
      return null
   }
}

exports.createOrga = async (orga) =>{
   const adOrg = new orgaModel(orga)
   const newOrga = await adOrg.save()
   const user = {
      id: newOrga._id,
      name: newOrga.name,
      email: newOrga.email,
      ifu: newOrga.ifu,
      phone: newOrga.phone,
      country: newOrga.country,
      city: newOrga.city,
      roles: newOrga.roles,
      events: newOrga.events
   }
   return user
}

exports.updateOrga = async (id, orga) => {
   await orgaModel.findByIdAndUpdate(id, orga)
   const newOrga = await orgaModel.findById(id)
   // console.log(newOrga);
   const user = {
      id: newOrga._id,
      name: newOrga.name,
      email: newOrga.email,
      ifu: newOrga.ifu,
      phone: newOrga.phone,
      country: newOrga.country,
      city: newOrga.city,
      roles: newOrga.roles,
      events: newOrga.events
   }
   return user
}

exports.deleteOrga = async (id) => {
   return await orgaModel.findByIdAndDelete(id)
}