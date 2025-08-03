const { z } = require('zod')

const createTheaterValidationSchema = z.object({
    name: z.string().min(3).max(50),
    plot: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    lat: z.string().optional(),
    lon: z.string().optional(),
    pincode: z.number(),
})

const createTheatreHallSchema = z.object({
    number: z.number().min(0),
    seatingCapacity: z.number().min(0),
    theatreId: z.string(),
})

const createTheatreHallMovieMappingSchema = z.object({
    movieId: z.string(),
    theatreHallId: z.string(),
    startTimeStamp: z.number(),
    endTimeStamp: z.number(),
    price: z.number(),
})

module.exports = { 
    createTheaterValidationSchema,
    createTheatreHallSchema,
    createTheatreHallMovieMappingSchema,
 }
