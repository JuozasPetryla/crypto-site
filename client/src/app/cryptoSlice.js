import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  coinbasepro } from "ccxt";
import axios from "axios";

export const fetchCryptos = createAsyncThunk(
  "cryptosList/fetchCryptos",
  async (pageNum = 1) => {
    try {
      const exchange = new coinbasepro();

      const currencies = await exchange.fetchTickers();
      const currencyArray = Object.values(currencies);

      const filteredArray = currencyArray.filter((currency) => {
        return (
          currency.symbol.includes("USD") &&
          !currency.symbol.includes(":") &&
          !currency.symbol.includes("USDT") &&
          !currency.symbol.includes("-")
        );
      });

      const sortedArray = filteredArray.sort(
        ({ last: a }, { last: b }) => b - a
      );

      const startIndex = (pageNum - 1) * 20;
      const endIndex = startIndex + 20;
      const pagedArray = sortedArray.slice(startIndex, endIndex);

      return pagedArray;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const fetchCryptosInfo = createAsyncThunk(
  "cryptosList/fetchCryptosInfo",
  async () => {
    try {
      const exchange = new coinbasepro();
      const currenciesInfo = await exchange.fetchCurrencies();
      const currencyInfoArray = Object.values(currenciesInfo);
      const currencyInfoArrayWithLogos = currencyInfoArray.map((crypto) => {
        return {
          id: crypto.id,
          name: crypto.name,
          logoUrl: `https://assets.coincap.io/assets/icons/${crypto.id.toLowerCase()}@2x.png`,
        };
      });
      return currencyInfoArrayWithLogos;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const fetchOHLCV = createAsyncThunk(
  "cryptosList/fetchOHLCV",
  async (symbol) => {
    try {
      const chartData = await axios.get(
        `http://localhost:5000/api/cryptos/${symbol}`
      );
      console.log(chartData);
      return chartData.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const cryptoSlice = createSlice({
  name: "cryptos",
  initialState: {
    cryptosList: [],
    cryptosInfoList: [],
    currentChartData: {},
    totalCryptos: 0,
    pageSize: 20,
    pageNum: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCryptos.fulfilled, (state, action) => {
      state.cryptosList = action.payload;
      state.totalCryptos = action.payload.length;
    });
    builder.addCase(fetchCryptosInfo.fulfilled, (state, action) => {
      state.cryptosInfoList = action.payload;
    });
    builder.addCase(fetchOHLCV.fulfilled, (state, action) => {
      state.currentChartData = action.payload;
    });
  },
});

export default cryptoSlice.reducer;
