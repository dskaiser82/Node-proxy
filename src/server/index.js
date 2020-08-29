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

app.get("/delivery-pickup/checkDeliveryAvailability", (req, response) => {
  axios
    .get(
      `https://www.tacobell.com/delivery-pickup/checkDeliveryAvailability?latitude=${req.query.latitude}&longitude=${req.query.longitude}`
    )
    .then((res) => {
      console.log(res.data);
      response.json(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/test", (req, response) => {
  console.log(req.query);
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => {
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
