const express = require("express");
const {
  sendCoin,
  getAllCoin,
  getSingleCoin,
  deleteCoin,
  updateCoin,
  deleteAllCoins,
} = require("../controllers/coinController");

const router = express.Router();

//GET ALL
router.get("/", getAllCoin);

//GET SINGLE
router.get("/:id", getSingleCoin);

//UPDATE
router.patch("/:id", updateCoin);

//DELETE
router.delete("/:id", deleteCoin);

//DELETE ALL
router.delete("/", deleteAllCoins);

//SEND
router.post("/", sendCoin);

module.exports = router;
