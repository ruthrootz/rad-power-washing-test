const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "rootzmacbwb@gmail.com",
    pass: "gvylgrsvvtkyvpkm",
  },
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => res.render('index'));

app.post("/freequote", async (req, res) => {
  const { name, phone, email, address1, address2, city, state, zip, footage, hearAbout, checkAllApply } = req.body;
  console.log(req.body);
  const emailData = {
    from: process.env.EMAIL,
    to: "nemucha115@gmail.com", // TODO: make this env var, Zach's business email
    subject: "test",
    text: "test text...",
  };
  await sendEmail(emailData);
  res.redirect("/thankyou.html");
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

