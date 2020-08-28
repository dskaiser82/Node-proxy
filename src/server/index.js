const bodyparser = require("body-parser");
const express = require("express");
const app = express();
var cors = require("cors");
const request = require("request");
const axios = require("axios");

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

app.get("/test", (req, response) => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`);
      console.log(res.data);
      response.json(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(process.env.PORT || 7000, () =>
  console.log(`Listening on port ${process.env.PORT || 7000}!`)
);
