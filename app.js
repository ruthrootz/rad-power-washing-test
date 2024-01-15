const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => res.render('index'));

app.post("/", async (req, res) => {
  const { name, phone, email, address1, address2, city, state, zip, footage, hearAbout, checkAllApply } = req.body;
  console.log(req.body);
  res.redirect("/");
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

