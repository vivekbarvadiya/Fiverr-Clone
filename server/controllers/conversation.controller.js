const createError = require("../utils/createErrors.js");
const Conversations = require("../models/conversation.model.js");

exports.getConversations = async (req, res, next) => {
  try {

    const allConversation = await Conversations.find();
    // req.isSeller ? { sellerId: req.userID } : { buyerId: req.userId }
    res.status(200).send(allConversation);

  } catch (error) {
    next(new createError('error', 401));
  }
}

exports.createConversation = async (req, res, next) => {
  const newConversation = new Conversations({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.body.to : req.userId,
    buyerId: req.isSeller ? req.userId : req.body.to,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller
  })

  try {
    const savedConversation = await newConversation.save();

    res.status(200).send(savedConversation);
  } catch (error) {
    next(error)

  }
}

exports.getSingleConversations = async (req, res, next) => {
  try {
    const singleConversation = await Conversations.findOne({ id: req.params.id });

    res.json(200).send(singleConversation);
  } catch (error) {
    next(arr)

  }
}

exports.updateConversations = async (req, res, next) => {
  try {
    const updatedConversations = await Conversations.findOneAndUpdate({ id: req.params.id }, {
      $set: {
        // readBySeller: true,
        // readByBuyer: true
        ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
      }
    }, { new: true });

    res.json(200).send(updatedConversations);
  } catch (error) {
    next(arr)

  }
}