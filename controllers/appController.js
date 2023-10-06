const userService = require('../services/userService')
const eventService = require('../services/eventService')
const catService = require('../services/categService')
const orgaService = require('../services/orgaService')
const ticketService = require('../services/ticketService')
const staffService = require('../services/staffService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const SECRET_KEY = "4715aed3c946f7b0lokoa38e6b534astan958362x8d84e96d10fbc04700770d572af3dce43625dd"

//------------------------Users Controllers 

//Get All users
exports.getAllUsers = async (req, res) => {
   try {
      const users = await userService.findAllUsers()
      res.status(200).json(users)
   } catch (error) {
      res.status(500).json({error})
   }
}

//Get user by id
exports.getUserById = async (req, res) => {
   try {
      const id = req.params.userId
      const user = await userService.findUserById(id)
      // console.log(user);
      res.status(200).json(user)
   } catch (error) {
      res.status(400).json(error)
   }
}

//Get user by Email
exports.getUserByEmail = async (req, res) => {
   try {
      const user = await userService.findUserByEmail(req.params.email)
      res.status(200).json(user)
   } catch (error) {
      res.status(400).json("User Dont Exist !")
   }
}

//Register User
exports.register = async (req, res) => {
   try {
      const {username, email,  password, age, sexe} = req.body;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const usernameRegex = /^[a-zA-Z0-9\-']+$/;
      if (emailRegex.test(email) && usernameRegex.test(username)){
         const user = await userService.findUserByEmail(email);
         const roles = ["user"]
         if(!user) {
            const hashedPassword = await bcrypt.hash(password, 15);
            const validUser = {
               username: username,
               email: email,
               age: age,
               sexe: sexe,
               password: hashedPassword,
               roles : roles
            }
            const newUser = await userService.saveUser(validUser);
            res.status(201).json(newUser);
         } else {
            res.status(403).json("User already Exist !");
         }
      } else {
         res.status(400).json("Incorrect informations !");
      }

   } catch (error) {
      res.status(400).json("Incorrect informations !");
   }
}

//Login user without Oauth system
exports.LoginWithoutOAuth = async (req, res) => {
   try {
      const {email, password} = req.body;
      const user = await userService.findUserByEmail(email);
      if(user) {
         const matchpass = await bcrypt.compare(password, user.password)
         if(matchpass) {
            
            const token = jwt.sign(
               {
                  id: user._id,
                  username: user.username,
                  email: user.email,
                  roles: user.roles
               },
               SECRET_KEY
            );
            res.status(200).json({"access_token": token})
         } else {
            res.status(401).json("Incorrect Email or Password")      
         }
      }else {
         res.status(401).json("Incorrect Email or Password")
      }
   } catch (error) {
      res.status(401).json("Incorrect Email or Password")
   }
}
exports.changeUserPass = async(req, res) => {
   try {
      console.log("here")
      const id = req.params.userId
      const user = await userModel.findById(id)
      const matchpass = await bcrypt.compare(req.body.oldPassword, user.password)
      if(matchpass) {
         console.log("chechpoint")
         user.password = await bcrypt.hash(req.body.newPassword, 15)
         const up = await userService.updateUser(id, user)
         res.status(201).json("Password Updated !")
      }else {
         res.status(400).json("Wrong old Password !")
      }
   } catch (error) {
      res.status(400).json("User doesn't exist !")
   }
}

//Update user
exports.updateUser = async (req, res) => {
   try {
      const id = req.params.userid;
      const user = await userService.findUserById(id);
      if(user){
         const up = await userService.updateUser(id, req.body)
         res.status(200).json(up)
      } else {
         res.status(400).json("User doesn't exist !")
      }
   } catch (error) {
      res.status(400).json("User doesn't exist !")
   }
}

//remove user
exports.deleteUser = async (req, res) => {
   try {
      const id = req.params.userid
      await userService.deleteUser(id);
      res.status(200).json("Operation successfully !")
   } catch (error) {
      res.status(400).json("User doesn't exist !")
   }
}

//--------------------------------------Event Controller

//Get All Events
exports.getEvents = async (req, res) => {
   try {
      const events = await eventService.findAllEvents();
      res.status(200).json(events)
   } catch (error) {
      res.status(400).json("Bad Request")
   }
} 

//Get Event By Id
exports.getEventById = async (req, res) => {
   try {
      const id = req.params.eventid;
      const event = await eventService.getById(id);
      res.status(200).json(event)
   } catch (error) {
      res.status(400).json("Event doesn't exist!") 
   }
}

//Create Event
exports.addEvent = async (req, res) => {
   try {
      const newEvent = await eventService.createEvent(req.body);
      res.status(201).json(newEvent);
   } catch (error) {
      res.status(400).json("Bad Params")
   }
}

//Update Event 
exports.updateEvent = async (req, res) => {
   try {
      const upEvent = await eventService.updateEvent(req.params.eventid, req.body)
      res.status(200).json(upEvent)
   } catch (error) {
      res.status(400).json("Bad Params")
   }
}

//Delete Event
exports.deleteEvent = async (req, res) => {
   try {
      await eventService.removeEvent(req.params.eventid)
      res.status(200).json("Event Delete successfully!")
   } catch (error) {
      res.status(400).json("User Not found!")
   }
}

//-------------------Category Controller

//Get Categories
exports.getCategories = async (req, res) => {
   try {
      const cats = await catService.getCategories()
      res.status(200).json(cats)
   } catch (error) {
      res.status(400).json("Bad Parms")
   }
}

//Get category By id
exports.getCategory = async (req, res) => {
   try {
      const cat = await catService.getCatById(req.params.catid)
      res.status(200).json(cat)
   } catch (error) {
      res.status(400).json("Category doesn't exist!")
   }
}

//Update category
exports.updateCategory = async (req, res) => {
   try {
      const upcat = await catService.updateCat(req.params.catid, req.body)
      res.status(200).json(upcat)
   } catch (error) {
      res.status(400).json("Bad Parms")
   }
}

//Create Category
exports.addCategory = async (req, res) => {
   try {
      const cat = await catService.saveCat(req.body)
      res.status(201).json(cat)
   } catch (error) {
      res.status(400).json("Bad Parms")
   }
}

//Delete Category
exports.deleteCategory = async (req, res) => {
   try {
      await catService.deletCat(req.params.catid)
      res.status(200).json("Category remove successfully!")
   } catch (error) {
      res.status(400).json("Bad Parms")
   }
}

//---------------------------Organisator Controller

//Get All Organisators
exports.getAllOrganisators = async (req, res) => {
   try {
      const org = await orgaService.findAllOrga();
      res.status(200).json(org)
   } catch (error) {
      res.status(400).json("Bad Params")
   }
}

//Get Organisator
exports.getOrganisator = async (req, res) => {
   try {
      const orga = await orgaService.getOrgaById(req.params.orgid)
      res.status(200).json(orga)
   } catch (error) {
      res.status(400).json("Bad Params")
   }
}

//Register Organisator
exports.registerOrganisator = async (req, res) => {
   try {
      const {name, email,  password, country, phone, city, ifu} = req.body;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(email)){
         // console.log("test ok");
         const user = await orgaService.getOrgaByemail(email);
         if(!user) {
            const hashedPassword = await bcrypt.hash(password, 15);
            const validUser = {
               name: name,
               email: email,
               country: country,
               phone: phone,
               password: hashedPassword,
               city: city,
               ifu: ifu,
               roles: ["organisator"]
            }
            const newUser = await orgaService.createOrga(validUser);
            res.status(201).json(newUser);
         } else {
            res.status(403).json("Organisator already Exist. !");
         }
      } else {
         res.status(400).json("Incorrect Email !");
      }

   } catch (error) {
      res.status(400).json("Incorrect informations !");
   }
}

//Login Organisator without Oauth system
exports.organisatorLoginWithoutOAuth = async (req, res) => {
   try {
      const {email, password} = req.body;
      const user = await orgaService.getOrgaByemail(email);
      // console.log(user);
      if(user) {
         const matchpass = await bcrypt.compare(password, user.password)
         if(matchpass) {
            const token = jwt.sign(
               {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  roles: user.roles
               },
               SECRET_KEY
            );
            res.status(200).json({"access_token": token})
         } else {
            res.status(401).json("Incorrect Email or Password")      
         }
      }else {
         res.status(401).json("Incorrect Email or Password")
      }
   } catch (error) {
      res.status(401).json("Incorrect Email or Password")
   }
}

//Update Organisator
exports.updateOrganisator = async (req, res) => {
   try {
      const id = req.params.orgid;
      const user = await orgaService.getOrgaById(id);
      if(user){
         const up = await orgaService.updateOrga(id, req.body)
         res.status(200).json(up)
      } else {
         res.status(400).json("Organisator doesn't exist !")
      }
   } catch (error) {
      res.status(400).json("Organisator doesn't exist !")
   }
}

//remove Organisator
exports.deleteOrganisator = async (req, res) => {
   try {
      const id = req.params.orgid
      await orgaService.deleteOrga(id);
      res.status(200).json("Operation successfully !")
   } catch (error) {
      res.status(400).json("Organisator doesn't exist !")
   }
}

//-----------------------------Ticket Controller

//Get All tickets
exports.getAllTickets = async (req, res) => {
   try {
      const tickets = await ticketService.findAllTickets()
      res.status(200).json(tickets)
   } catch (error) {
      res.status(400).json("Bad Params !")
   }
}

//Get Ticket By Id
exports.getTicket = async (req, res) => {
   try {
      const ticket = await ticketService.findTicketById(req.params.tickid)
      res.status(200).json(ticket)
   } catch (error) {
      res.status(400).json("Bad Params !")
   }
}

//Create Ticket 
exports.addTicket = async (req, res) => {
   try {
      const ticket = await ticketService.createTicket(req.body)
      res.status(200).json(ticket)
   } catch (error) {
      res.status(400).json("Bad Params !")
   }
}

//Update Ticket
exports.updateTicket = async (req, res) => {
   try {
      const tick = await ticketService.findTicketById(req.params.tickid, req.body)
      res.status(200).json(tick)
   } catch (error) {
      res.status(400).json("Bad Params !")
   }
}

//Remove Ticket 
exports.removeTicket = async (req, res) => {
   try {
      await ticketService.removeTicket(req.params.tickid)
      res.status(200).json("Ticket delete successfully !")
   } catch (error) {
      res.status(400).json("Bad Params !")
   }
}

//----------------------Staff Endpoint
exports.getAllStaffCode = async (req,res) => {
   try {
      const staff = await staffService.findAllStaff()
      res.status(200).json(staff)
   } catch (error) {
      res.status(400).json('Bad Params')
   }
}

// ---------- Mapping function-------------------

exports.organisatorCreateEvent = async (req, res) => {
   try {
      const catid = req.params.catid;
      const cat  = await catService.getCatById(catid);
      const event = await eventService.createEvent(req.body)
      const newEvent = await categoryAddToEvent(cat, event)
      await eventAddToCaegory(newEvent, cat)
      const orgid = req.params.orgid
      const org = await orgaService.getOrgaById(orgid)
      //Mapping 
      await eventToOrganisator(newEvent, org)
      await organisatorToEvent(org, event)
      const upEv = await generateEventStaffCode(newEvent, org)
      console.log(upEv);
      //-----
      res.status(201).json(upEv)
   } catch (error) {
      res.status(400).json("Bad Params in Organisator create !")
   }
}

//Organistor statistiques
exports.organisatorStats = async (req, res) => {
   try {
      const orgid = req.params.orgid
      const org = await orgaService.getOrgaById(orgid)
      const totalEvents = org.events.length
      let totalTickets = 0;
      let incomes = 0;
      let lastEvent = {name: "None"}
      if(totalEvents != 0) {
         org.events.forEach(async (event) => {
            e = await eventService.getById(event._id)
            totalTickets += e.tickets.length
            if(e.tickets.length != 0){
               console.log(e.tickets.length);
               e.tickets.forEach(tick => {
                  incomes += tick.price
               });
            }
         }); 
         lastEvent = org.events[totalEvents-1]
      }
      // console.log(lastEvent);
      const stats = {
         totalEvents: totalEvents,
         totalTickets: totalTickets,
         incomes: incomes,
         lastEvent: lastEvent.name
      }
      res.status(200).json(stats)
   } catch (error) {
      res.status(400).json("Bad Params !")
   }
}

//Map create ticket
exports.reserveTicket = async (req, res) => {
   try {
      eventId = req.params.eventId
      userId = req.params.userId
      const ticket = await ticketService.createTicket(req.body)
      ticketMapEvent(eventId, ticket)
      userMapEvent(userId, ticket)
      res.status(201).json(ticket)
   } catch (error) {
      res.status(400).json("Bad Params !")
   }
}

//Favorite Event user
exports.favoriteEvent = async (req, res) => {
   try {
      const userId = req.params.userId
      const eventId = req.params.eventId
      const event = await eventService.getById(eventId)
      const user = await userService.findUserById(userId)
      user.events.push(event)
      const upUser = await userService.updateUser(user.id, user)
      res.status(200).json(upUser)
   } catch (error) {
      res.status(400).json("Bad Params")
   }
}

//Change Ticket Status
exports.changeTicketStatus = async (req, res) => {
   try {
      const tickid = req.params.tickId;
      const ticket = await ticketService.updateTicket(tickid, req.body);
      res.status(201).json(ticket)
   } catch (error) {
      res.status(400).json('Bad Params')
   }
}


//------------------ private function

//Map category add to event
const categoryAddToEvent = async (cat, event) => {
   const ev = {
      name: event.name,
      description : event.description,
      date: event.date,
      heure: event.heure,
      lieu: event.lieu,
      performers: event.performers,
      participants: event.participants,
      sponsors: event.sponsors,
      category: cat
   }
   const upEvent = await eventService.updateEvent(event._id, ev)
   return upEvent
}

//Map event to category
const eventAddToCaegory = async (event, cat) =>{
   cat.events.push(event)
   await catService.updateCat(cat._id, cat)
} 

//Map event to organisator
const eventToOrganisator = async (event, orga) => {
   orga.events.push(event)
   // console.log(orga);
   const org = await orgaService.updateOrga(orga.id, orga)
}

//Map organisator to Event
const organisatorToEvent = async (orga, event) => {
   event.organisator = orga;
   await eventService.updateEvent(event._id, event)
}

//Map event to ticket
const ticketMapEvent = async (eventId, ticket) => {
   const event = await eventService.getById(eventId)
   event.tickets.push(ticket)
   const ev = await eventService.updateEvent(event._id, event)
   ticket.event = ev
   await ticketService.updateTicket(ticket._id, ticket)
}

//Map user to ticket
const userMapEvent = async (userId, ticket) => {
   const user = await userService.findUserById(userId)
   ticket.user = user
   await ticketService.updateTicket(ticket._id, ticket)
   user.tickets.push(ticket)
   await userService.updateUser(userId, user)
}

//Get Staff Code
const generateEventStaffCode = async (event, org) => {
   const n1 = Math.floor(Math.random() * 8) + 1;
   const n2 = Math.floor(Math.random() * 8) + 1;
   const n3 = Math.floor(Math.random() * 8) + 1;
   const letters = 'AZERTYUIOPMLKJHGFDSQWXCVBN';
   const lett = Math.floor(Math.random() * 20) + 3;
   const le = letters.substring(lett-2, lett)
   const code = `${le}A${n1*n2}S${n3}`
   event.code_Staff = code
   const upEv = await eventService.updateEvent(event._id, event)
   const staff = {
      "code": code,
   }
   const newStaff = await staffService.createStaff(staff)
   newStaff.event = event;
   newStaff.organisator = org;
   await staffService.updateStaff(newStaff._id, newStaff)
   return upEv
}

