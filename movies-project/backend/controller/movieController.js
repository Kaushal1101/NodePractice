// Functions defined for different CRUD actions
// Each one gives a response (res) with a json message
// Good practice to have status 200 when sending response
// Also good practice to describe function in comments as shown below

// Imports the async handler
// Since express doesn't handle async errors by default, we need try and catch
// To avoid all that, we can import and use express' async handler
// It will pass all errors to errorMiddleware automatically
const asyncHandler = require('express-async-handler')

// Gets the movie object with all methods to interact with mongooseDB
const Movie = require('../models/movieModel')

// @desc    Get goals
// @route   GET /api/movies
// @access  Private
const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find()

    res.status(200).json(movies)
})

// @desc    Set goals
// @route   POST /api/movies
// @access  Private
const setMovies = asyncHandler(async (req, res) => {
    // If no request body, or text in body, throw error
    if (!req.body || !req.body.text) {
        res.status(400)
        throw new Error('Please add a movie')
    }

    const movie = await Movie.create({
        text: req.body.text,
    })
    res.status(200).json(movie)
})

// @desc    Update goals
// @route   PUT /api/movies/:id
// @access  Private
const updateMovies = asyncHandler(async (req, res) => {

    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        res.status(400)
        throw new Error('Movie not found')
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedMovie)
})

// @desc    Delete goals
// @route   DELETE /api/movies/:id
// @access  Private
const deleteMovies = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id)

    if (!movie) {
        res.status(400)
        throw new Error('Movie not found')
    }

    await movie.deleteOne()

    res.status(200).json({ id : req.params.id })
})


// Export all these functions of this module for use in other files
module.exports = {
    getMovies,
    setMovies,
    updateMovies,
    deleteMovies
}
