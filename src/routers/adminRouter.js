const express = require("express");
const { MongoClient } = require("mongodb");
const debug = require("debug").apply("app:adminRouter");
const sessions = require("../data/sessions.json");

const adminRouter = express.Router();

adminRouter.route("/").get((req, res) => {
  const url =
    "mongodb+srv://srikanthgowda9231:e7oAP4BrW6iDRmKC@globomantics.jgfqygy.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("connected to mongo db");

      const db = client.db(dbName);

      const response = await db.collection("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = adminRouter;
