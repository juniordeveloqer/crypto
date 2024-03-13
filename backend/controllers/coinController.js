const Coin = require("./models/coin");

//GET ALL
const getAllCoin = async (req, res) => {
  try {
    const coins = await Coin.find();
    Response.json(coins);
  } catch {
    res.status(500).json({ message: err.message });
  }
};
//GET SINGLE

const getSingleCoin = async (req, res) => {
  try {
    const coin = await Coin.findById();
    if (!coin) {
      return res.status(400).json({ message: "coin not found" });
    }
    Response.json(coin);
  } catch {
    res.status(500).json({ message: err.message });
  }
};
//UPDATE
const updateCoin = async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);
    if (!coin) {
      return res.status(400).json({ message: "coin not found" });
    }
    name: req.body.name;
    symbol: req.body.symbol;
    price: req.body.price;
    marketCap: req.body.marketCap;
    changePercentage: req.body.changePercentage;

    const updatedCoin = await coin.save();
    res.json(updatedCoin);
  } catch {
    res.status(500).json({ message: err.message });
  }
};

//DELETE
const deleteCoin = async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);
    if (!coin) {
      return res.status(400).json({ message: "coin not found" });
    }
    await coin.remove();
    res.json({ message: "coin deleted" });
  } catch (err) {
    res.status(500).json({ message: "err" });
  }
};

//send new coin data

const sendCoin = async (req, res) => {
  const coin = new Coin({
    name: req.body.name,
    symbol: req.body.symbol,
    price: req.body.price,
    marketCap: req.body.marketCap,
    changePercentage: req.body.changePercentage,
  });

  try {
    const newCoin = await coin.save();
    res.status(201).json(newCoin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
