const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  gigId:{
    type:String,
    required:true
  },
  img:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  sellerId:{
    type:String,
    required:true
  },
  buyerId:{
    type:String,
    required:true
  },
  isCompleted:{
    type:Boolean,
    default:false
  },
  payment_intet:{
    type:String,
    required:true
  },
},
{
    timestamps:true
});

module.exports = mongoose.model("Order",orderSchema)