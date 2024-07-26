const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const dbConnect = require("./config/database");
const messageRoutes = require("./routes/message.routes");
const cookieparser = require("cookie-parser");
const usersRoutes = require("./routes/users.routes");
const { server, app } = require("./socket/socket");
const path = require("path");

__dirname = path.resolve();

dotenv.config();
// const app = express();
app.use(express.json()); //global middleware
app.use(cookieparser());
app.use("/api/auth", authRoutes);
app.use("/auth/message", messageRoutes);
app.use("/api/users", usersRoutes);

app.use(express.static(path.join(__dirname, "/FrontEnd/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "FrontEnd", "dist", "index.html"));
});

server.listen(process.env.PORT || 5000, () => {
  dbConnect();
  console.log("server started");
});
