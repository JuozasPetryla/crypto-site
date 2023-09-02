import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./cryptoSlice";

export default configureStore({
  reducer: {
    crypto: counterReducer,
  },
});
