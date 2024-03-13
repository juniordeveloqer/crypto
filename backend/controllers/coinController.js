const { default: mongoose } = require("mongoose");
const Coin = require("../models/coin");

//GET ALL
const getAllCoin = async (req, res) => {
  try {
    const coins = await Coin.find();
    res.json(coins);
  } catch {
    res.status(500).json({ message: "err message" });
  }
};
//GET SINGLE

const getSingleCoin = async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);
    if (!coin) {
      return res.status(400).json({ message: "coin not found" });
    }
    res.json(coin);
  } catch {
    res.status(500).json({ message: "err message" });
  }
};
//UPDATE
const updateCoin = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such coin" });
    }

    const coin = await Coin.findByIdAndUpdate(id, req.body, { new: true });

    if (!coin) {
      return res.status(404).json({ error: "No such coin" });
    }

    res.status(200).json(coin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//DELETE
const deleteCoin = async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);
    if (!coin) {
      return res.status(400).json({ message: "coin not found" });
    }
    await Coin.findByIdAndDelete(req.params.id);
    res.json({ message: "coin deleted" });
  } catch (err) {
    res.status(500).json({ message: "err" });
  }
};

//send new coin data//post
const sendCoin = async (req, res) => {
  const { name, symbol, price, marketCap, changePercentage } = req.body;
  try {
    const savedCoin = await Coin.create({
      name,
      symbol,
      price,
      marketCap,
      changePercentage,
    });
    res.status(200).json(savedCoin);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating coin", error: error.message });
  }
};

//deleteall
const deleteAllCoins = async (req, res) => {
  try {
    await Coin.deleteMany({});
    res.json({ message: "All coins deleted" });
  } catch (err) {
    res.status(500).json({ message: "err message" });
  }
};

module.exports = {
  sendCoin,
  getAllCoin,
  getSingleCoin,
  deleteCoin,
  updateCoin,
  deleteAllCoins,
};
