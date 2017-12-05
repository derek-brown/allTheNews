var express = require("express");
var parser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var app = express();

var port = process.env.PORT || 8080;

app.use(logger("dev"));

app.use(parser.urlencoded({extended: false}));

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/news", {
  useMongoClient: true
});

require("./routes/scrape.js")(app);

app.listen(port, function() {
  console.log("App running on port " + port + "!");
});

