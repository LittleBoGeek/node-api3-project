// code away!


const express = require('express');

const server = express()
const port = 3000

const userRouter = require("./users/userRouter")

server.use(express.json())
server.use(userRouter)
server.use(logger)

server.get('/', (req, res, next) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
  next()
});

//custom middleware


function logger(req, res, next) {
const time = new Date().toISOString()
console.log(`${req.method} ${req.url} ${time}`)
   
}

module.exports = server;

server.listen(port, () => {
    console.log(`Server running on ${port}`)
})