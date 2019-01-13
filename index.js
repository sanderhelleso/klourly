'use strict';

require("dotenv").load();

// initialize firebase
const firebase = require("firebase-admin");
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
});

// vals
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");

// app
const app = express();
const path = require("path");
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes go here /////////////
require("./routes/authenticated")(app);
require("./routes/signup")(app);
require("./routes/login")(app);
require("./routes/userData")(app);
require("./routes/upload")(app);
require("./routes/countries")(app);
require("./routes/room")(app);
require("./routes/invite")(app);
require("./routes/attendence")(app);
require("./routes/messaging")(app);
require("./routes/report")(app);
require("./routes/algolia")(app);
//////////////////////////////

// serve out production assets
app.use(express.static("client/build"));

// if it dosent recognize the route
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// start server
server.listen(port, host => {
    console.log(`Magic is happening on ${port}`);
});
