// import express package
const express = require("express");

//import path package
const path = require("path");

// Intialize the app
const app = express();

// Port Variable
const port = process.env.PORT || 3000;

// Use public folder
app.use(express.static(path.join(__dirname, "public")));

// Server listner
const server = app.listen(port, () => {
  // Print server starting log
  console.log(`Server Listening on ${port}`);
});
