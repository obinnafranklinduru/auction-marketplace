require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const auctionRoutes = require("./routes/auction.route");
const authRoutes = require("./routes/auth.route");

const app = express();
app.use(express.json());

//routes
app.use("/api/auctions", auctionRoutes);
app.use("/api/auth", authRoutes);

//server
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start the server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Server running on port " + PORT);
  } catch (error) {
    console.error(error.message);
  }
})();
