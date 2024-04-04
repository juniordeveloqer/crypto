const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coinSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  symbol: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  marketCap: {
    type: Number,
    required: true,
  },

  changePercentage: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("coin", coinSchema);
