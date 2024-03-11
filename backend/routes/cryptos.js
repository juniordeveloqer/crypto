const express = require("express");

const router = express.Router();

//GET ALL
router.get("/", (req, res) => {
  res.json({ mssg: "GET ALL" });
});

//GET SINGLE
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET SINGLE " });
});

//UPDATE
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE" });
});

//DELETE
router.get("/:id", (req, res) => {
  res.json({ mssg: "DELETE" });
});

//SEND
router.post("/", (req, res) => {
  res.json({ mssg: "POST" });
});
