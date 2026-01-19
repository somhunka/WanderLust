const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

//Creating Schema for model
const listingSchema = new Schema({
title: {
    type: String,
    required: true,
},
    description: String,
image: {
       url: String,
       filename : String,
},
price: {
    type: Number,
    required: true,
    min: 0
},
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref : "User",
    }
});

listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews }
        });
    }
});

//Creating model based on above Schema--->
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing; //exporting model to Node
