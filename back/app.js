
const express = require('express');
const app = new express();
const cors = require('cors');
const path = require("path")
const port = 8080;





const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
app.use(cors({
  origin:'*'
}))
app.use(express.static('public'));
app.use(express.json()) // parses requests as json
app.use('/', express.static(path.resolve('./dist'))); // serve main path as static dir
app.get('/', function(req, res) { // serve main path as static file
  res.sendFile(path.resolve('./dist/index.html'))
});

const pokemonRouter = require("./src/routers/pokemonRouter");
const userRouter = require("./src/routers/userRouter");
const {errorHandlerMiddleware} = require("./src/middleware/errorHandler")
const {userHandler} = require("./src/middleware/userHandler");


app.use(userHandler);

app.use('/pokemon', pokemonRouter);
app.use('/info', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));
  
  app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening ....`)
})