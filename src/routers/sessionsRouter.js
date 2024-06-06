const express = require('express');

const { MongoClient, ObjectId } = require("mongodb");
const debug = require("debug")("app:sessionsRouter");
const sessionsRouter = express.Router();

sessionsRouter.use((req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.redirect('/auth/signIn');
    }
})

sessionsRouter.route('/').get((req,res)=>{
    const url =
    "mongodb+srv://srikanthgowda9231:e7oAP4BrW6iDRmKC@globomantics.jgfqygy.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("connected to mongo db");

      const db = client.db(dbName);

      const sessions = await db.collection("sessions").find().toArray();
      res.render('sessions',{sessions});
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});
sessionsRouter.route('/:id').get((req,res)=>{
    const id = req.params.id;
    const url =
    "mongodb+srv://srikanthgowda9231:e7oAP4BrW6iDRmKC@globomantics.jgfqygy.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug("connected to mongo db");

      const db = client.db(dbName);

      const session = await db.collection("sessions").findOne({_id: new ObjectId(id)});
      res.render('session',{session});
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
})

module.exports = sessionsRouter;