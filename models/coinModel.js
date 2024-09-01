import mongoose from 'mongoose';

const coinSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  changePercentage: { type: Number, required: true },
  image: { type: String, required: true }
});

const Coin = mongoose.models.Coin || mongoose.model('Coin', coinSchema);

export default Coin;
