const { ethers, JsonRpcProvider } = require("ethers");
const dotenv = require("dotenv");
const ABI = require("../constant/AuctionMarketplace.json");
dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Connect to Ethereum Test network
const provider = new JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const auctionContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

// (async () => {
//   try {
//     console.log("Checking item count...");
//     const ItemCount = await auctionContract.itemCount();
//     console.log("Auction item count:", ItemCount);
//   } catch (error) {
//     console.error("Error fetching data from contract:", error);
//   }
// })();

// Function to post a new auction item on-chain
const postItemOnChain = async (name, description, price, expiryDate) => {
  try {
    const tx = await auctionContract.postItem(
      name,
      description,
      ethers.utils.parseEther(price.toString()),
      expiryDate
    );

    await tx.wait(); // Wait for transaction confirmation

    return tx.hash; // Return transaction hash
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to place a bid on an auction item
const placeBidOnChain = async (itemId, bidAmount) => {
  try {
    const tx = await auctionContract.placeBid(itemId, {
      value: ethers.utils.parseEther(bidAmount.toString()),
    });

    await tx.wait();

    return tx.hash;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { postItemOnChain, placeBidOnChain };
