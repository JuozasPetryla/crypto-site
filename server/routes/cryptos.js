const express = require("express");
const router = express.Router();
const ccxt = require("ccxt");
const exchange = new ccxt.coinbasepro();
const todayTime = new Date().getTime();

router.get("/cryptos/ohlcv/:id", async (req, res) => {
  try {
    const symbol = req.params.id;
    const granularity = req.query.granularity;
    const timeInterval = req.query.timeInterval;
    const timeSince = todayTime - timeInterval;

    const ohlcv = await exchange.fetchOHLCV(`${symbol}-USD`, granularity, [
      timeSince,
    ]);

    if (ohlcv.status === 404) {
      res.status(404).json({ err: "Resource not found" });
    }
    if (ohlcv.status === 500) {
      res.status(500).json({ err: "Network error" });
    }
    console.log(`Selected cryptocurrency: ${symbol.split("/")[0]}`);
    res.status(200).json({ coin: symbol, chartData: ohlcv });
  } catch (err) {
    res.json({ err: "Error fetching authors" });
  }
});

router.get("/cryptos", async (req, res) => {
  try {
    const perPage = 12;
    const currencies = await exchange.fetchTickers();
    const currenciesInfo = await exchange.fetchCurrencies();
    const currencyArray = Object.values(currencies);
    const currencyInfoArray = Object.values(currenciesInfo);

    const currencyInfoArrayWithLogos = currencyInfoArray.map((crypto) => {
      return {
        id: crypto.id,
        name: crypto.name,
        logoUrl: `https://assets.coincap.io/assets/icons/${crypto.id.toLowerCase()}@2x.png`,
      };
    });

    if (currencies.status === 404 || currenciesInfo.status === 404) {
      res.status(404).json({ err: "Resource not found" });
    }
    if (currencies.status === 500 || currenciesInfo.status === 500) {
      res.status(500).json({ err: "Network error" });
    }

    const combinedArray = currencyArray.map((currency) => {
      return {
        ...currencyInfoArrayWithLogos.find(
          (cur) => cur.id === currency.symbol.split("/")[0]
        ),
        ...currency,
      };
    });

    const filteredArray = combinedArray.filter((currency) => {
      return (
        currency.symbol.includes("USD") &&
        !currency.symbol.includes(":") &&
        !currency.symbol.includes("USDT") &&
        !currency.symbol.includes("-")
      );
    });

    const search = req.query.search;
    const pagination = req.query.pageNum ? +req.query.pageNum : 1;
    let searchedArray = [];
    searchedArray = filteredArray;

    if (search) {
      searchedArray = filteredArray.filter((crypto) => {
        return (
          crypto.name?.toLowerCase().includes(search.toLowerCase()) ||
          crypto.symbol?.toLowerCase().includes(search.toLowerCase())
        );
      });
      searchedArray.forEach((crypto) =>
        console.log(`Searched cryptocurrencies: ${crypto.name}`)
      );
    }

    const sortedArray = searchedArray.sort(({ last: a }, { last: b }) => b - a);
    const startIndex = (pagination - 1) * perPage;
    const endIndex = startIndex + perPage;
    const pagedArray = sortedArray.slice(startIndex, endIndex);
    res.status(200).json({
      pagedArray,
      totalCryptos: filteredArray.length,
      totalPages: Math.ceil(searchedArray.length / perPage),
      curPage: pagination,
      searchTerm: search,
    });
  } catch (err) {
    res.json({ err: "Error fetching cryptos" });
  }
});

module.exports = router;
