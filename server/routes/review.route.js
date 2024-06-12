const express = require("express");
const router= express.Router();
const { verifyToken } = require("../middleware/jwt");
const { createReview, getReviews ,deleteReview} = require("../controllers/review.controller");



router.post('/',verifyToken,createReview);
router.get('/:id',getReviews);
router.delete('/:id',verifyToken,deleteReview);







module.exports = router;