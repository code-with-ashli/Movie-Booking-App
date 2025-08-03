const {Schema, model} = require('mongoose')
const { isNumberObject } = require('node:util/types')
const { number } = require('zod')

const moviesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    language: {
        type: String,
    },
    imgeURL: {
        type: String,
    },
    durationInMinutes:{
        type: Number,
    },
}, {timestamps: true})

const Movies = model('movies', moviesSchema)
module.exports = Movies