const { createTheaterValidationSchema, createTheatreHallSchema, createTheatreHallMovieMappingSchema } = require('../lib/validators/theatre.validator');
const TheatreHall = require('../models/theatre-halls.model');
const Theatre = require('../models/theatre.model')
const TheatreHallMovieMapping = require('../models/theatre-hall-movie-mapping')


class TheatreService{

      /**
   * @function getAll
   * @returns { Promise<Theatre[]> } List of theatres
   */
  static async getAll() {
    const theatres = await Theatre.find({})
    return theatres;
  }

  static async create(data) {
    const safeParsedData = await createTheaterValidationSchema.safeParseAsync(
      data
    )
    if (safeParsedData.error) throw new Error(safeParsedData.error)
    return await Theatre.create(safeParsedData.data)
  }

  static getById(id){
    return Theatre.findById(id);
  }

  static getHallsByTheatreId(id) {
    return TheatreHall.find({ theatreId: id })
  }

  static async createTheatreHall(data) {
    const validationResult = await createTheatreHallSchema.parseAsync(data)
    return TheatreHall.create(validationResult)
  }

  static async createShow(data){
    const validationResult = await createTheatreHallMovieMappingSchema.parseAsync(data)
    return TheatreHallMovieMapping.create(validationResult)
  }

  static getAllShowsByMovieId(data) {
    return  TheatreHallMovieMapping.find({data}).populate({
      path: 'theatreHallId',
      populate: [{ path: 'theatreId' }],
    })
  }

  static getShowsByMovieIdExtended(movieId) {
    return TheatreHallMovieMapping.find({ movieId }).populate({
      path: 'theatreHallId',
      populate: [{ path: 'theatreId' }],
    })
  }


}

module.exports = TheatreService