const express = require('express');
const { createMovie, getAllMovies, moviefindbyid, updateMovie, deleteMovie, addReview, deleteReview } = require('../controller/movieController');
const router = express.Router();



router.post('/createmovie', createMovie);
router.post('/findallmovies',getAllMovies);
router.get('/findmoviebyid/:id', moviefindbyid );
router.put('/update/:id',updateMovie);
router.delete('/deletemovie/:id',deleteMovie );
router.post('/addreview/:id',addReview);
router.delete("/deletereview/:movieId/:reviewId", deleteReview);









module.exports=router