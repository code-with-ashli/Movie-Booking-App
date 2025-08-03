const express = require('express');
const theatreController = require('../controllers/theatre.controller');
const movieController = require('../controllers/movie.controller');
const { restrictedToRole } = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(restrictedToRole('admin'));

//theater

router.get('/theatres', theatreController.getAllTheatres)
router.get('/theatre/:id', theatreController.getTheaterById)
router.post('/theatres', theatreController.createTheatre)
// router.patch('/theatres/:id')
// router.delete('/theatres/:id')

//halls
// Theatre Halls
router.get(
    '/theatres/:theatreId/halls',
    theatreController.getTheatreHallsByTheatreId
  )
router.post('/theatres/halls', theatreController.createTheatreHall)

//theatre hall movie mapping

router.get('/shows/:showId', theatreController.getShowByMovieId) //in future make this public
router.post('/show', theatreController.createShow)
  

//movies

router.get('/movies/:id', movieController.getByMovieId)
router.post('/movies', movieController.createMovie)
// router.patch('/movies/:id')
// router.delete('/movies/:id')

module.exports = router;