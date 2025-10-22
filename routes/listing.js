const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const passport = require("passport");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listing");



//Index Route
router.get("/", validateListing, wrapAsync(listingController.index)
);


//New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm)
);


//Show Route
router.get("/:id", wrapAsync(listingController.showListing)
);

//Create Route
router.post("/", isLoggedIn, wrapAsync(listingController.createListing)
);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)
);

//Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)
);


//DELETE Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)
);




module.exports = router;