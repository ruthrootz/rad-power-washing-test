const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const send = async (data) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
}

app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => res.render('index'));

app.post("/", async (req, res) => {
  const { name, phone, email, address1, address2, city, state, zip, footage, hearAbout, checkAllApply } = req.body;
  console.log(req.body);
  const emailData = {
    from: email,
    to: "nemucha115@gmail.com", // TODO: make this env var, Zach's business email
    subject: "test",
    text: "test text...",
  };
  await send(emailData);
  res.redirect("/thankyou.html");
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

