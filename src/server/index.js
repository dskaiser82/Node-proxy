const bodyparser = require("body-parser");
const express = require("express");
const app = express();
var cors = require("cors");
const request = require("request");

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/delivery-pickup/checkDeliveryAvailability", (req, res) => {
  request(
    {
      url: `https://www.tacobell.com/delivery-pickup/checkDeliveryAvailability?latitude=${req.query.latitude}&longitude=${req.query.longitude}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.listen(process.env.PORT || 7000, () =>
  console.log(`Listening on port ${process.env.PORT || 7000}!`)
);
