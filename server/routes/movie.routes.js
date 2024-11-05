import express from 'express';
import { getrendingMovies, getMoviestrailers,getMoviesDetails,getSimilarMovies,getMoviesByCategory } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending", getrendingMovies)
router.get("/:id/trailers", getMoviestrailers)
router.get("/:id/details", getMoviesDetails)
router.get("/:id/similar", getSimilarMovies)
router.get("/:category", getMoviesByCategory)

export default router;