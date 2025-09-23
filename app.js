const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
app.flash = require("connect-flash");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js")


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))




main()
    .then(() => {
        console.log("connection succesful");
    })
    .catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Havenly');
}





app.use("/listings",listings);
app.use("/listings/:id/reviews", reviews)







// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// })


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});



app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Page Not Found" } = err;
    res.status(statusCode).render("err.ejs", { message });
});

app.listen(8080, () => {
    console.log("app is listening");
});





