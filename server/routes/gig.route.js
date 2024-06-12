const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/jwt");

const {
  createGig,
  getGig,
  getGigs,
  deleteGig,
} = require("../controllers/gig.controller");

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

module.exports = router;
