const MovieService = require('../Services/movie.service')
const { movieValidationSchema } = require('../lib/validators/movies.validator')

async function getAllMovies(req, res) {
    const movies = await MovieService.getAll()
    return res.json({ data: movies })
}

async function getByMovieId(req, res) {
    const movieId = req.params.id;
    const movie = await MovieService.getMovieById(movieId);

    if(!movie) return res.status().json({status:'error', error: `Movie with ${movieId} is not found`})
    
    return res.json({ status: "Success", data: movie});
    
}

async function createMovie(req, res) {
    const validationStatus = await movieValidationSchema.safeParseAsync(
        req.body
    )

    if (validationStatus.error)
        return res.status(400).json({ error: validationStatus.error })

    const movie = await MovieService.create(validationStatus.data)

    return res.status(201).json({status: 'success', data: movie})
}

module.exports = {
    getAllMovies,
    getByMovieId,
    createMovie,
}
