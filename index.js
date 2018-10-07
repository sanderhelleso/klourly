// ES6
'use strict';

// initialize firebase
const firebase = require("firebase-admin");
const serviceAccount = require("./keys/firebaseServiceAccountKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://klourly-44ba2.firebaseio.com"
});

// vals
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const dotenv = require("dotenv").load();

// app
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes go here
require("./routes/signup")(app);
require("./routes/login")(app);
require("./routes/authenticated")(app);
/////////////////////////

// serve out production assets
app.use(express.static("client/build"));

// if it dosent recognize the route
const path = require("path");
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// start server
server.listen(port, host => {
    console.log(`Magic is happening on ${port}`);
});
