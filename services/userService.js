const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

//Get User Operation
exports.findAllUsers = async () => {
   const users = await userModel.find().populate("tickets").populate("events")
   let finalUsers = [];
   users.forEach(element => {
      const user = {
         id: element._id,
         username: element.username,
         email: element.email,
         age: element.age,
         sexe: element.sexe,
         roles: element.roles,
         tickets: element.tickets,
         watchLists: element.events
      }
      finalUsers.push(user);
   });
   return finalUsers;
}

exports.findUserById = async (id) => {
   const userFind = await userModel.findById(id).populate("tickets").populate("events")
   // console.log(userFind);
   const user = {
      id: userFind._id,
      username: userFind.username,
      email: userFind.email,
      age: userFind.age,
      sexe: userFind.sexe,
      roles: userFind.roles,
      tickets: userFind.tickets,
      watchLists: userFind.events,
   }
   return user;
}

exports.findUserByEmail = async (email) => {
   const userFind = await userModel.findOne({email})
   // const user = {
   //    username: userFind.user,
   //    email: userFind.email,
   //    age: userFind.age,
   //    sexe: userFind.sexe,
   //    roles: userFind.roles,
   //    tickets: userFind.tickets,
   // }
   return userFind;
}

//Save User Operation
exports.saveUser = async (user) => {
   const addUser = new userModel(user)
   const newUser = await addUser.save();
   const userA = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      age: newUser.age,
      sexe: newUser.sexe,
      roles: newUser.roles,
      tickets: newUser.tickets,
   }
   return userA;
}

//Update user operation
exports.updateUser = async (id, user) => {
   if(user.password){
      user.password = await bcrypt.hash(user.password, 10)
   }
   await userModel.findByIdAndUpdate(id, user);
   const up = await userModel.findById(id)
   const userA = {
      username: up.username,
      email: up.email,
      age: up.age,
      sexe: up.sexe,
      roles: up.roles,
      tickets: up.tickets,
      watchLists: up.events
   }
   return userA;
}

//delete operation
exports.deleteUser = async (id) => {
   return await userModel.findByIdAndDelete(id)
}
