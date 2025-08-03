const { Schema, model} = require('mongoose')

const bookingSchema = new Schema ({
    showId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'theatreHallNovieMapping',
    },
    seatNumber: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    gateway: {
        type: String,
        required: true,
        enum: ['RAZORPAY', 'STRIPE'],
    },
    userId : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    }
}, {timestamps: true})

bookingSchema.index({showId: 1, seatNumber: 1}, {unique: true})

const Booking = model('booking', bookingSchema)
module.exports = Booking