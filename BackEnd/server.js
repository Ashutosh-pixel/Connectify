const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const dbConnect = require("./config/database");
const messageRoutes = require("./routes/message.routes");
const cookieparser = require("cookie-parser");
const usersRoutes = require("./routes/users.routes");

dotenv.config();
const app = express();

app.use(express.json()); //global middleware
app.use(cookieparser());
app.use("/api/auth", authRoutes);
app.use("/auth/message", messageRoutes);
app.use("/api/users", usersRoutes);

app.listen(process.env.PORT || 5000, () => {
  dbConnect();
  console.log("server started");
});
