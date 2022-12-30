// index.js
// where your node app starts
require("dotenv").config();

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;
  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(Number(dateParam))) {
    date = new Date(Number(dateParam));
  } else {
    date = new Date(dateParam);
  }
  console.log(`${dateParam} => ${date} (${typeof date}) - timestamp: ${date.getTime()}`);

  if (isNaN(date.getTime())) {
    return res.json({ error: date.toString() });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
