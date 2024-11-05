import express from 'express';

const router = express.Router();
import { getTrendingTv,getTvtrailers,getTvDetails,getSimilarTv,getTvByCategory } from '../controllers/tv.controller.js';

router.get("/trending", getTrendingTv)
router.get("/:id/trailers", getTvtrailers)
router.get("/:id/details", getTvDetails)
router.get("/:id/similar", getSimilarTv)
router.get("/:category", getTvByCategory)

export default router;