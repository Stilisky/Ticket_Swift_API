var express = require('express')
var router = express.Router();

const {
   getAllUsers,
   getUserById,
   getUserByEmail,
   register,
   LoginWithoutOAuth,
   updateUser,
   deleteUser,
   addEvent,
   deleteEvent,
   getEventById,
   getEvents,
   updateEvent,
   addCategory,
   deleteCategory,
   getCategories,
   getCategory,
   updateCategory,
   deleteOrganisator,
   getAllOrganisators,
   getOrganisator,
   organisatorLoginWithoutOAuth,
   registerOrganisator,
   updateOrganisator,
   addTicket,
   getAllTickets,
   getTicket,
   removeTicket,
   updateTicket,
   organisatorCreateEvent,
   organisatorStats,
   reserveTicket,
   getAllStaffCode,
   favoriteEvent,
   changeTicketStatus,
   changeUserPass
} = require('../controllers/appController');
const {authUSer, authAdmin, authOrganisator} = require('../middlewares/authMiddleWare')

//User endpoint
router.route('/users').get(getAllUsers)
router.route('/register').post(register)
router.route('/users/:userId').get(getUserById).put(authUSer, updateUser).delete(authAdmin, deleteUser)
router.route('/login').post(LoginWithoutOAuth)
router.route('/user/:email').get(authUSer, getUserByEmail)
router.route('/changeUserPass').put(authUSer, changeUserPass)

//event endpoint
router.route('/events').get(getEvents).post(addEvent)
router.route('/events/:eventid').get(getEventById).put(authOrganisator, updateEvent).delete(authOrganisator, deleteEvent)

//Category endpoint
router.route('/categories').get(getCategories).post(authAdmin, addCategory)
router.route('/categories/:catid').get(getCategory).put(authAdmin, updateCategory).delete(authAdmin, deleteCategory)

//Organisator endpoint
router.route('/organisators').get(getAllOrganisators)
router.route('/register/organisator').post(registerOrganisator)
router.route('/organisators/:orgid').get(authOrganisator, getOrganisator).put(authOrganisator, updateOrganisator).delete(authAdmin, deleteOrganisator)
router.route('/organisator/login').post(organisatorLoginWithoutOAuth) 

//Ticket endpoint
router.route('/tickets').get(getAllTickets).post(authUSer, addTicket)
router.route('/tickets/:tickid').get(getTicket).put(authOrganisator, updateTicket).delete(authAdmin, removeTicket)

//Staff Endpoint
router.route('/staff').get(getAllStaffCode)

//Maping Endpoint
router.route('/organisator/category/:catid').post(authOrganisator, organisatorCreateEvent)
router.route('/statistiques').get(authOrganisator, organisatorStats)
router.route('/organisator').get(authOrganisator, getOrganisator)
router.route('/reserveTicket/:eventId').post(authUSer, reserveTicket)
router.route('/myorganisator').get(authOrganisator, getOrganisator).put(authOrganisator, updateOrganisator)
router.route('/myuser').get(authUSer, getUserById)
router.route('/favorites/:eventId').post(authUSer,favoriteEvent)
router.route('/changeStatus/:tickId').put(authUSer, changeTicketStatus)

module.exports = router