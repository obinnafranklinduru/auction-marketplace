const Auction = require("../models/auction.model");
const ethersService = require("../services/ethers.service");

// Create a new auction item (in MongoDB and on-chain)
exports.createAuctionItem = async (req, res) => {
  const { name, description, price, expiryDate } = req.body;
  try {
    // Post the item on-chain
    const txHash = await ethersService.postItemOnChain(
      name,
      description,
      price,
      expiryDate
    );

    // Save item in MongoDB
    const newItem = new Auction({
      itemId: Math.floor(Math.random() * 10000),
      name,
      description,
      price,
      expiryDate,
      owner: "owner-address",
      isSold: false,
    });
    await newItem.save();

    res.status(201).json({ message: "Item created", txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Place a bid on an auction item (on-chain)
exports.placeBid = async (req, res) => {
  const { itemId, bidAmount } = req.body;
  try {
    // Place the bid on-chain
    const txHash = await ethersService.placeBidOnChain(itemId, bidAmount);

    // Update bid information in MongoDB
    const item = await Auction.findOne({ itemId });
    if (item) {
      item.highestBidder = "bidder-address"; // Update with actual bidder address
      item.highestBidPrice = bidAmount;
      await item.save();
    }

    res.status(200).json({ message: "Bid placed", txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
