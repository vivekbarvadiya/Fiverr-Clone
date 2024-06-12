const createError = require("../utils/createErrors");
const Review = require("../models/review.model.js");
const Gig = require("../models/gig.model.js");


exports.createReview = async (req, res, next) => {
    if (req.isSeller) {
        return next(createError(403, "You are not allowed to create review as seller"));
    }

    const review = new Review({
        userId: req.body.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
    })
    try {
        const existingReview=await Review.findOne({userId:req.body.userId,gigId:req.body.gigId});

        if (existingReview){
            return next(createError(403,"You are already reviewed this gig"));
        }
        const newReview=await review.save();

        await Gig.findByIdAndUpdate(req.body.gigId,{$inc:{totalStars:req.body.stars,starNumber:1}});

        res.status(200).json(newReview);
    } catch (err) {
        next(err)
    }
}

exports.getReviews = async (req, res) => {
    const reviews=await Review.find({gigId:req.body.gigId});

    res.status(201).json(reviews);
}

exports.deleteReview = async (req, res) => {
    res.status(201).json("");

}