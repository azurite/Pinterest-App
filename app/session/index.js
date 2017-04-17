const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

module.exports = function() {
  mongoose.connect(process.env.DB_URI);
  
  return session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    cookie: {
      maxAge: 12 * 24 * 60 * 60 * 1000 //2 weeks
    },
    resave: false,
    saveUninitialized: false
  });
};
