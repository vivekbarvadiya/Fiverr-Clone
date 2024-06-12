const express = require("express");
const router= express.Router();
const {verifyToken} = require("../middleware/jwt.js");
const {getMessages,createMessage}=require("../controllers/message.controller.js")

router.get("/:id",verifyToken,getMessages);
router.post("/",verifyToken,createMessage);

module.exports = router;