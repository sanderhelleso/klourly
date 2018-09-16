// ES6
'use strict'

// initialize firebase
const firebase = require("firebase-admin");
const serviceAccount = require("./keys/firebaseServiceAccountKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://klourly-44ba2.firebaseio.com"
});

/*firebase.auth().createUser({
    email: "user@example.com",
    emailVerified: false,
    phoneNumber: "+11234567890",
    password: "secretPassword",
    displayName: "John Doe",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
})
.then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
})
.catch(function(error) {
      console.log("Error creating new user:", error);
});*/

// firebase test
/*const db = firebase.database();
const ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

const usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});*/

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
