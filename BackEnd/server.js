const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const dbConnect = require("./config/database");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
  dbConnect();
  console.log("server started");
});
