// routes/auctionRoutes.js
const express = require("express");
const router = express.Router();
const auctionController = require("../controllers/auction.controller");
const { protect } = require("../middlewares/auth.middleware");

// Route to create a new auction item
router.post("/auction", protect, auctionController.createAuctionItem);

// Route to place a bid on an auction item
router.post("/bid", protect, auctionController.placeBid);

module.exports = router;
