const createError = require("../utils/createErrors.js");
const Message = require("../models/message.model.js");
const Conversation = require("../models/conversation.model.js");

exports.getMessages = async (req, res, next) => {
    const message = new Message({
        convetsationId: req.body.convetsationId,
        userId: req.userId,
        desc: req.body.desc
    })
    try {

        const newMessage = await message.save();
        await Conversation.findOneAndUpdate({ id: req.body.convetsationId }, {
            $set: {
                readBySeller: req.isSeller,
                readByBuyer: !req.isSeller,
                lastMessage: req.body.desc,
            }
        }, { new: true })

        res.status(200).json(newMessage);
    } catch (error) {
        next(error)
    }
}

exports.createMessage = (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}