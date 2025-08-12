const {
    createTheaterValidationSchema,
    createTheatreHallSchema,
    createTheatreHallMovieMappingSchema,
} = require('../lib/validators/theatre.validator')
const TheatreService = require('../Services/theatre.service')

async function getAllTheatres(req, res) {
    const theatres = await TheatreService.getAll()
    return res.json({ data: theatres })
}

async function createTheatre(req, res) {
    const validationStatus = await createTheaterValidationSchema.safeParseAsync(
        req.body
    )

    if (validationStatus.error)
        return res.status(400).json({ error: validationStatus.error })

    const theatre = await TheatreService.create(validationStatus.data)

    return res.status(201).json({ status: 'success', data: theatre })
}

async function getTheaterById(req, res) {
    const theatreId = req.params.id
    const theatre = await TheatreService.getById(theatreId)

    if (!theatre)
        return res
            .status(404)
            .json({
                status: 'error',
                error: `Theatre with ${theatreId} is not found`,
            })

    return res.json({ status: 'Success', data: theatre })
}

async function deleteTheatreById(req, res) {
    const theatreId = req.params.id
    const theatre = await TheatreService.deleteById(theatreId)

    if (!theatre)
        return res
            .status(404)
            .json({
                status: 'error',
                error: `Theatre with ${theatreId} is not found`,
            })

    return res.json({ status: 'Success', data: theatre })
}

async function deleteShow(req, res) {
    const showId = req.params.id
    const show = await TheatreService.deleteByShowId(showId)

    if (!show)
        return res
            .status(404)
            .json({
                status: 'error',
                error: `Theatre with ${showId} is not found`,
            })

    return res.json({ status: 'Success', data: show })
}

// Controller for halls
async function getTheatreHallsByTheatreId(req, res) {
    const theatreId = req.params.theatreId
    const halls = await TheatreService.getHallsByTheatreId(theatreId)
    return res.json({ status: 'success', data: halls })
}

async function createTheatreHall(req, res) {
    const validationResult = await createTheatreHallSchema.safeParseAsync(
        req.body
    )

    if (validationResult.error)
        return res.status(400).json({ error: validationResult.error })

    const hall = await TheatreService.createTheatreHall(validationResult.data)

    return res.status(201).json({ status: 'success', data: hall })
}

async function getShowByMovieId(req, res) {
    const movieId = req.params.movieId
    const shows = await TheatreService.getAllShowsByMovieId(movieId)
    return res.status(200).json({ data: shows })
}

async function createShow(req, res) {
    const validationResult = await createTheatreHallMovieMappingSchema.safeParseAsync(
        req.body
    )

    if (validationResult.error)
        return res.status(400).json({ error: validationResult.error })

    const { endTimestamp, movieId, price, startTimestamp, theatreHallId} = validationResult.data
 
    const show = await TheatreService.createShow(validationResult.data);
    return res.status(201).json({status: 'success', data: show});
}


module.exports = {
    getAllTheatres,
    createTheatre,
    getTheaterById,
    deleteTheatreById,
    getTheatreHallsByTheatreId,
    createTheatreHall,
    getShowByMovieId,
    createShow,
    deleteShow
}
