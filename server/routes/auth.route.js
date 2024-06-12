const express=require("express")
const router = express.Router();

const {login,logOut,register} = require("../controllers/auth.controller")

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logOut);




module.exports=router;