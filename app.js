const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = 3000;

dotenv.config();
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.API_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));
app.use("/", require("./routes/users"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
