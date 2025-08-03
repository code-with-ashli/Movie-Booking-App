const {Schema, model} = require('mongoose')

const threatreHallMovieMappingSchema = new Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'movies',
    },
    theatreHallId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'theatreHall',
    },
    startTimeStamp: {
        type: Number,
        required: true,
    },
    endTimeStamp: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {timestamps: true})

threatreHallMovieMappingSchema.index(
    {
        movieId: 1, theatreHallId: 1, startTimeStamp:1, endTimeStamp: 1
    }, 
    {
        unique: true
    }
)

const TheatreHallMovieMapping = model('theatreHallNovieMapping', threatreHallMovieMappingSchema)
module.exports = TheatreHallMovieMapping