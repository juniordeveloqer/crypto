require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const AllRoutes = require("./routes/crypto");
const axios = require("axios");
const Coin = require("./models/coin");

//express app
const app = express();

//routes
app.use("/api/coin", AllRoutes);

//connect mangodb
mongoose
  .connect(process.env.MANGO_URI)
  .then(() => {
    //listen  for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port 4000", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// CoinGecko API DATA
axios
  .get("https://api.coingecko.com/api/v3/coins/markets", {
    params: {
      vs_currency: "usd",
      per_page: 10,
      page: 1,
    },
  })
  .then(async (response) => {
    const coins = response.data;

    // Save Coins
    for (const coin of coins) {
      try {
        const newCoin = new Coin({
          name: coin.name,
          symbol: coin.symbol,
          price: coin.current_price,
          marketCap: coin.market_cap,
          changePercentage: coin.price_change_percentage_24h,
        });
        await newCoin.save();
        console.log(`${coin.name} saved to database`);
      } catch (err) {
        console.error(`Error saving ${coin.name} to database: ${err.message}`);
      }
    }
  })
  .catch((err) => {
    console.error("Error fetching coin data:", err.message);
  });
