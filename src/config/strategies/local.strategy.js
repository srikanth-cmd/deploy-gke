const passport = require('passport');

const {Strategy} = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy');
module.exports = function localStrategy(){
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    },(username,password,done)=>{
        const url =
    "mongodb+srv://srikanthgowda9231:e7oAP4BrW6iDRmKC@globomantics.jgfqygy.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "globomantics";
  (async function validateUser() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const user = await db.collection('users').findOne({ username });

      if (user && user.password === password) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
    client.close();
  })();

    }
    ));
}