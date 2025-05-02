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
