// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function isUnixTimestamp(x) {
  let timestamp = x * 1000
  let time = new Date(timestamp)

  return isNaN(Date.parse(time)) ? false : true
}

function isDateString(x) {
  return isNaN(Date.parse(x)) ? false : true
}

function isValidDate(x) {
  return isDateString(x) || isUnixTimestamp(x) ? true : false
}

app.get("/api", (req, res) => {
  res.json({
    unix: Math.floor(new Date().getTime()),
    utc: new Date().toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  var date = req.params.date;

  if (date !== null && !isValidDate(date))
    res.json({ error: "Invalid Date" });

  if (isUnixTimestamp(date)) {
    res.json({
      unix: parseInt(date),
      utc: new Date(parseInt(date)).toUTCString()
    });
  }
  else {
    res.json({
      unix: Math.floor(new Date(date).getTime()),
      utc: new Date(date).toUTCString()
    });
  }

});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
