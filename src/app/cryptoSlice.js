import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCryptos = createAsyncThunk(
  "cryptosList/fetchCryptos",
  async ({ search = "", pageNum = 1 }) => {
    try {
      const cryptos = await axios.get(
        `https://crypto-check-data.onrender.com/api/cryptos?search=${search}&pageNum=${pageNum}`
      );
      return cryptos.data;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const fetchOHLCV = createAsyncThunk(
  "cryptosList/fetchOHLCV",
  async ({ symbol, granularity = 300, longTime = false }) => {
    try {
      const hour = 1000 * 60 * 60;
      let timeInterval;
      if (granularity === 300) {
        timeInterval = hour;
      } else if (granularity === 900) {
        timeInterval = hour * 24;
      } else if (granularity === 3600) {
        timeInterval = hour * 24 * 7;
      } else if (granularity === 21600) {
        timeInterval = hour * 24 * 31;
      } else if (granularity === 86400 && longTime === "3months") {
        timeInterval = hour * 24 * 31 * 3;
      } else if (granularity === 86400 && longTime === "6months") {
        timeInterval = hour * 24 * 31 * 6;
      } else if (granularity === 86400 && longTime === "all") {
        timeInterval = hour * 24 * 31 * 10;
      }

      const chartData = await axios.get(
        `https://crypto-check-data.onrender.com/api/cryptos/ohlcv/${symbol}?granularity=${granularity}&timeInterval=${timeInterval}`
      );
      console.log(chartData);
      return chartData.data;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const cryptoSlice = createSlice({
  name: "cryptos",
  initialState: {
    cryptosList: [],
    currentChartData: {},
    totalCryptos: 0,
    pageSize: 20,
    pageNum: 1,
    totalPages: 0,
    curPage: 1,
    searchTerm: "",
    timeUnit: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCryptos.fulfilled, (state, action) => {
      state.cryptosList = action.payload.pagedArray;
      state.totalCryptos = action.payload.totalCryptos;
      state.totalPages = action.payload.totalPages;
      state.curPage = action.payload.curPage;
      state.searchTerm = action.payload.searchTerm;
    });
    builder.addCase(fetchOHLCV.fulfilled, (state, action) => {
      state.currentChartData = action.payload;
    });
  },
});

export default cryptoSlice.reducer;
