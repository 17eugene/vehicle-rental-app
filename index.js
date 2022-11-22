const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const { carRoutes, userRoutes, orderRoutes } = require("./routes");

const app = express();
const PORT = process.env.PORT || 2221;

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/car", carRoutes);
app.use("/api/order", orderRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html")
    );
  });
}

app.use((_, res) => {
  res.status(404).json({ message: "Not found!" });
});

app.use((err, _, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server error";

  res.status(status).json({ message });
});

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB. Server run on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
