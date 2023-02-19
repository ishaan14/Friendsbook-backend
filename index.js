require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("MongoDB Connection Successful");
});
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
