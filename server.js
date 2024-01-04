const express = require("express");
const app = express();
app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));

app.get("/", (req, res) =>
  {
    res.render("index");
  }
);

app.listen(3000)

