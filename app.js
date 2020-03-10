var express = require("express");
var path = require("path");
var favicon = require("static-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var routes = require("./routes/index");
var users = require("./routes/users");

var app = express();

//mogodb uri
var mongoUri =
  "mongodb://avenue_user:mFOb6KBOG5EOwY8U@chat-app-shard-00-00-hohce.mongodb.net:27017,chat-app-shard-00-01-hohce.mongodb.net:27017,chat-app-shard-00-02-hohce.mongodb.net:27017/bedata?ssl=true&replicaSet=chat-app-shard-0&authSource=admin&retryWrites=true&w=majority";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);
app.use("/users", users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log("connected to database");

    app.listen(2000, function() {
      console.log("listening on port 2000");
    });
  })
  .catch(err => {
    console.log(err);
  });
