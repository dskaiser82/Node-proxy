const bodyparser = require("body-parser");
const express = require("express");
const app = express();
var cors = require("cors");
const request = require("request");
const axios = require("axios");

// app.use(cors);

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/json-placeholder", (req, response) => {
  axios
    .get(
     "https://jsonplaceholder.typicode.com/todos/1"
    )
    .then((res) => {
      console.log(res.data);
      response.json(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/tbGeocodeService", (req, response) => {
  let config = {
    headers: { "Content-Type": "application/json" },
    timeout: 60000,
  };
  //data object to send
  let jsonData = {
    sessiontoken: req.body.sessiontoken,
    query: req.body.query,
  };

  axios
    .post(
      "https://www-rel-q.nonprod.tb-aws.com/tbGeocodeService",
      jsonData,
      config
    )
    .then((res) => {
      // console.log(res.data);
      response.json(res.data);
    })
    .catch(function (error) {
      // console.log(err);
    });
});

app.post("/tbPlaceDetails", (req, response) => {
  let config = {
    headers: { "Content-Type": "application/json" },
    timeout: 60000,
  };
  //data object to send
  let jsonData = {
    sessiontoken: req.body.sessiontoken,
    place_id: req.body["place_id"],
  };

  axios
    .post(
      "https://www-rel-q.nonprod.tb-aws.com/tbPlaceDetails",
      jsonData,
      config
    )
    .then((res) => {
      // console.log(res.data);
      response.json(res.data);
    })
    .catch(function (error) {
      // console.log(err);
    });
});

app.listen(process.env.PORT || 7000, () =>
  console.log(`Listening on port ${process.env.PORT || 7000}!`)
);
