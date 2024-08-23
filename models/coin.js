import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  price: Number,
  marketCap: Number,
  changePercentage: Number,
});

const Coin = mongoose.models.Coin || mongoose.model('Coin', coinSchema);

export default Coin;
