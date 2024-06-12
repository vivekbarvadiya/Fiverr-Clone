const Order=require("../models/order.model.js");
const Gig=require("../models/gig.model.js");


exports.createOrders = async (req, res,next) => {
    try {

        const gig=await Gig.findOne(req.params.gigId);


        const newOrder=new Order({
            gigId:gig._id,
            img:gig.cover,
            title:gig.title,
            buyerId:req.userId,
            sellerId:gig.userId,
            price:gig.price,
            payment_intent:"temporary"
        })

        await newOrder.save();

        res.status(201).json(newOrder);
    
    } catch (err) {
        next(err)
    }
}



exports.getOrders = async (req, res) => {
    res.status(201).json("");

}
