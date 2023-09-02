const express = require("express");
const router = express.Router();
const ccxt = require("ccxt");

router.get("/cryptos/:id", async (req, res) => {
  try {
    const symbol = req.params.id;
    const exchange = new ccxt.coinbasepro();
    const ohlcv = await exchange.fetchOHLCV(`${symbol}/USD`);
    res.status(200).json({ coin: symbol, chartData: ohlcv });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
