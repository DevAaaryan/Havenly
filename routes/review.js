const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middlewares.js");
const reviewController = require("../controllers/review");


//Reviews
//Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete("/:reviewId", isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));



module.exports = router;