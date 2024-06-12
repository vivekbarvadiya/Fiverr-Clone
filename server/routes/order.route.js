const express = require("express");
const router= express.Router();
const { verifyToken } = require("../middleware/jwt");
const { createOrders, getOrders } = require("../controllers/order.controller");



router.post("/",verifyToken,createOrders);
router.get("/",verifyToken,getOrders);






module.exports = router;