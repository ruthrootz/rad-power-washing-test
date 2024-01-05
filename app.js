const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));

app.get("/", (req, res) => res.render('index'));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

