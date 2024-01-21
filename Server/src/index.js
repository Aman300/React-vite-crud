const express = require("express");
require("dotenv/config");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));

const session = require("express-session");

app.use(
  session({
    secret: "voteing@#Online$($(",
    resave: false,
    saveUninitialized: true,
  })
);

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function mongoDB() {
  try {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(
      "mongodb+srv://thinkinternet2020:FlrUonevplMlfTXx@cluster0.bgydh5k.mongodb.net/REACT-CRUD?retryWrites=true&w=majority",
      dbOptions
    );

    console.log("Your Mgdb data base connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the function to connect to MongoDB
mongoDB();

app.use(logger("dev"));
app.use(cors());

app.use(bodyParser.json());
var cookieParser = require("cookie-parser");
const router = require("./Routes");
app.use(cookieParser());

app.use("/api/v1", router);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../../Client/dist")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../Client/dist", "index.html"));
});

app.listen(
  3001,
  console.log(`Server is running on port http://localhost:3001`)
);
