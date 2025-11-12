const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const passport = require("passport");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listing");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });



router.route("/")
.get(validateListing, wrapAsync(listingController.index)
)
// .post(isLoggedIn, wrapAsync(listingController.createListing)
// );

.post(upload.single('listing[image]'),(req,res)=>{
    res.send(req.file)
})



//New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm)
);


//Show Route
router.get("/:id", wrapAsync(listingController.showListing)
);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)
);

router.route("/:id")
.put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)
);




module.exports = router;