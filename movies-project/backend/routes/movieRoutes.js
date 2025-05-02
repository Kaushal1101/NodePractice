const express = require('express')
const router = express.Router()
const { getMovies, setMovies, updateMovies, deleteMovies } = require('../controller/movieController')


// CRUD calls, functions defined in the movieController file to abstract away 

// This is NOT performing two functions together, it's the same as
// router.get('/', getMovies)
// router.post('/', setMovies)
router.route('/').get(getMovies).post(setMovies)

// Update and Delete requires id of movie that needs to be accessed, hence the /:id
router.route('/:id').put(updateMovies).delete(deleteMovies)


module.exports = router