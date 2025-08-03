const express = require('express')
const { authenticationMiddleware, restrictedToRole } = require('../middlewares/auth.middleware')
const controller = require('../controllers/booking.controller')

const router = express.Router()

router.use(authenticationMiddleware)
router.use(restrictedToRole('user'));

router.post('/create', controller.handleCreateBookings)
router.post('/verify-payment', controller.verifyPayment)

module.exports = router;