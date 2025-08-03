const express = require('express')
const router = express.Router()

const movieController = require('../controllers/movie.controller')
const theatreController = require('../controllers/theatre.controller')


router.get('/movies',movieController.getAllMovies);
router.get('/shows/:showId', theatreController.getShowByMovieId) 

module.exports = router