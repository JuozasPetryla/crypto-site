import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { version, cryptocom } from "ccxt";

export const fetchCryptos = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const exchange = new cryptocom();
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
    return filteredArray;
  }
);

export const cryptoSlice = createSlice({
  name: "cryptos",
  initialState: {
    cryptosList: [],
    totalCryptos: 0,
  },
  reducers: {
    getCryptosSuccess: (state, action) => {
      state.cryptosList = action.payload;
      state.totalCryptos = action.payload.length;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCryptos.fulfilled, (state, action) => {
      state.cryptosList = action.payload;
      state.totalCryptos = action.payload.length;
    });
  },
});

export default cryptoSlice.reducer;
