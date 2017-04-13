const express = require("express");
const app = express();

if(process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/.env" });
}

app.use((req, res) => {
  console.log("hello from: ", req.url);
  res.end();
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port: ", process.env.PORT);
});
