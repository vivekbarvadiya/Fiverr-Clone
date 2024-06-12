const express = require("express");
const { deleteUser,updateUser, getUser } = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/jwt");
const router= express.Router();


router.delete("/:id",verifyToken,deleteUser)
router.get("/:id",verifyToken,getUser)

router.put("/update/:id",updateUser)

module.exports = router;