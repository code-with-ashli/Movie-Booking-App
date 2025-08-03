const { Schema, model } = require('mongoose')

const theatreHallSchema = new Schema({
    number :{
        type: Number,
        required: true,
        min: 0,
    },
    seatingCapacity: {
        type: Number,
        required: true,
        min: 0,
    },
    theatreId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'theatre',
    }
   
}, {timestamps: true})
//both must be unique 1- ascending, -1 descending
theatreHallSchema.index({number: 1, theatreId: 1}, {unique: true})

const TheatreHall = model('theatreHall', theatreHallSchema)
module.exports = TheatreHall