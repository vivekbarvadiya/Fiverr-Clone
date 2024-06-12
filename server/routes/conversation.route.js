const express = require("express");
const router= express.Router();
const {verifyToken} = require("../middleware/jwt.js");
const { getConversations, createConversation, getSingleConversations, updateConversations } = require("../controllers/conversation.controller.js");


router.get("/",verifyToken,getConversations);
router.post("/",verifyToken,createConversation);
router.get("/single/:id",verifyToken,getSingleConversations);
router.put("/:id",verifyToken,updateConversations);






module.exports = router;