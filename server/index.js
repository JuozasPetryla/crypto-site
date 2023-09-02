const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api", require("./routes/cryptos"));

const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
