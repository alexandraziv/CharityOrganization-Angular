"use strict";

var express = require("express"),
	app = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    controller = require("./controller.js");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.route("/api/donors")
    .get(controller.query)
    .post(controller.save);
app.route("/api/donors/:id")
    .get(controller.show)
    .put(controller.update);

app.route("/api/categories")
    .get(controller.getCategories);

app.listen(3000, function() {
    console.log("Server started");
});