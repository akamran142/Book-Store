require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/bookRoute");
const cors = require("cors");
const app = express();

console.log(process.env)
// Middleware
app.use(express.json()); // convert incoming req to json , express builtin middleware function
app.use(cors());
app.use("/books", bookRouter); //localhost:5000/books

// connect mongoose with mongoDB
mongoose
  .connect(
    process.env.SECRET_KEY
  )
  .then(() => console.log("Databese connected"))
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));

