// Functions defined for different CRUD actions
// Each one gives a response (res) with a json message
// Good practice to have status 200 when sending response
// Also good practice to describe function in comments as shown below

// @desc    Get goals
// @route   GET /api/movies
// @access  Private
const getMovies = (req, res) => {
    res.status(200).json({ message: `Get movies`})
}

// @desc    Set goals
// @route   POST /api/movies
// @access  Private
const setMovies = (req, res) => {
    // If no request body, or text in body, throw error
    if (!req.body || !req.body.text) {
        res.status(400)
        throw new Error('Please add a movie')
    }
    res.status(200).json({ message: `Set movies`})
}

// @desc    Update goals
// @route   PUT /api/movies/:id
// @access  Private
const updateMovies = (req, res) => {
    res.status(200).json({ message: `Update ${req.params.id} movie`})
}

// @desc    Delete goals
// @route   DELETE /api/movies/:id
// @access  Private
const deleteMovies = (req, res) => {
    res.status(200).json({ message: `Delete ${req.params.id} movie`})
}


// Export all these functions of this module for use in other files
module.exports = {
    getMovies,
    setMovies,
    updateMovies,
    deleteMovies
}
