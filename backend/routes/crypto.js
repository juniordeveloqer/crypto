const express = require("express");

const router = express.Router();

//GET ALL
router.get("/api/coin", (req, res) => {
  res.json({ mssg: "GET ALL" });
});

//GET SINGLE
router.get("/api/coin/:id", async (req, res) => {
  try {
    const coin = await Coin.findById(req.params.id);
    if (!coin) {
      return res.status(404).json({ message: "Coin bulunamadı" });
    }
    res.status(200).json(coin);
  } catch (err) {
    res.status(500).json({ message: "İstek işlenirken bir hata oluştu" });
  }
});

//UPDATE
router.patch("/api/coin/:id", (req, res) => {
  res.json({ mssg: "UPDATE" });
});

//DELETE
router.delete("/api/coin/:id", (req, res) => {
  res.json({ mssg: "DELETE" });
});

//SEND
router.post("/api/coin", (req, res) => {
  res.json({ mssg: "POST" });
});

module.exports = router;
