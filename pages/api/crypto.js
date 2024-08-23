import axios from 'axios';
import Coin from '../../models/coin';  // Model dosyanızın yolunu güncelleyin
import connectToDatabase from '../../lib/mongoose';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await connectToDatabase(); // Veritabanına bağlan

      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: { vs_currency: 'usd', per_page: 10, page: 1 },
      });
      const coins = response.data;

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

      res.status(200).json(coins);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
