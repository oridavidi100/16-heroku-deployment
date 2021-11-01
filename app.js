const express = require('express');
const app = new express();
const userAgentRouter = require('./src/routes/userAgentRouter');
const userAgentMiddleware = require('./src/middleware/userAgentMiddleware');
const cors = require('cors');
const path = require("path");

app.use(cors()); // cors middleware
app.use(userAgentMiddleware);
app.use('/ua', userAgentRouter);
app.use('/', express.static(path.resolve('./dist'))); // serve main path as static dir
app.get('/', function(req, res) { // serve main path as static file
  res.sendFile(path.resolve('./dist/index.html'))
});


app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));
