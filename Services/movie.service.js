const { movieValidationSchema } = require('../lib/validators/movies.validator');
const Movie = require('../models/movies.model')

class MovieService{
    static async getAll(){
        const movies = await Movie.find({})
        return movies;
    }

    static async create(data){
        const safeParsedData = await movieValidationSchema.safeParseAsync(data)

        if(safeParsedData.error) throw new Error (safeParsedData.error)

        return await Movie.create(safeParsedData.data)
    }

    static getMovieById(id){
        return Movie.findById(id);
    }
}

module.exports = MovieService;