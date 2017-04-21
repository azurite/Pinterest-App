const path = require("path");
const passport = require("passport");
const logger = require("connect-logger");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const auth = require("./app/auth");
const session = require("./app/session");
const routes = require("./app/routes");
const api = require("./app/api");

if(process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/.env" });
  app.use(logger());
}

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "client"));

auth.setup();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(auth.routes());
app.use(api());

app.use(express.static(path.join(process.cwd(), "build", "client")));
app.use(routes());

app.listen(process.env.PORT, () => {
  console.log("Server listening on port: ", process.env.PORT);
});
