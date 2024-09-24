const { mongoose, Schema } = require("mongoose");

const auctionSchema = new Schema({
  itemId: Number, // ID from the smart contract
  owner: String, // Address of the owner
  name: String, // Name of the auction item
  description: String, // Description of the auction item
  price: Number, // Starting price of the auction
  highestBidder: String, // Address of the highest bidder
  highestBidPrice: Number, // Highest bid so far
  expiryDate: Number, // Expiration time (in UNIX timestamp)
  isSold: Boolean, // Whether the item is sold
});

const auctionBidSchema = new Schema({
  auctionId: {
    type: Schema.Types.ObjectId,
    ref: "auctions",
    required: true,
  },
  bidderId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  bidAmount: Number,
  bidTime: Date,
});

const Auction = mongoose.model("Auction", auctionSchema);
const AuctionBid = mongoose.model("AuctionBid", auctionBidSchema);

module.exports = { Auction, AuctionBid };
