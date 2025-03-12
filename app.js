const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const config = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.FROM_EMAIL,
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

app.get('/', (req, res) => res.render('index'));

app.post('/freequote', async (req, res) => {
  let { name, phone, email,
    address1, address2,
    city, state, zip,
    footage, hearAbout, checkAllApply,
    commentsQuestions, otherReason } = req.body;

  if (hearAbout === 'other')
    hearAbout = !!otherReason ? otherReason : 'other';

  const params = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET,
    response: req.body['g-recaptcha-response'],
  });
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: params,
  });
  const body = await response.json();
  const success = body.success;
  console.log(body);

  if (!success || !name || !phone || !email || !zip || !checkAllApply) {
    console.log('likely a bot');
    res.status(429).end();
    return;
  }

  const emailData = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `Quote request from ${name}`,
    text: `Name: ${name}
Phone: ${phone}
Email: ${email}
Address: ${address1}
Address 2: ${address2}
City: ${city}
State: ${state}
Zip: ${zip}
Square footage of house: ${footage}
Service/s requested: ${checkAllApply ? checkAllApply.toString().replace(',', ', ') : '[none selected]'}
How they heard about RAD: ${hearAbout ? hearAbout : '[none selected]'}
Comments, questions: ${commentsQuestions}`,
  };
  console.log(emailData);

  await send(emailData);
  res.redirect('/thankyou.html');
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
