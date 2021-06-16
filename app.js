const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const appConfig = require('./config/appConfig');



const bcrypt = require('bcrypt');
const saltRounds = 10;
const WebSocket = require('ws');

const personController = require('./app/controllers/personController')

const url = process.env.DATABASE_URI || appConfig.development.url
const port = process.env.PORT || appConfig.development.port
const socket_port = process.env.SOCKET_PORT || appConfig.development.socket_port

app.use(cors());

app.listen(port);
mongoose.connect(url, { useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true })
console.log('🚀 The magic happens on port ' + port);

const socketServer = new WebSocket.Server({ port: socket_port })

socketServer.on('connection', socket => {
  socket.on('message', async message => {
    let messageData = JSON.parse(message)
    if (messageData.type === 'POST') {
      personController.savePeople(messageData.data)
    } else if (messageData.type === 'GET') {
      const people = await personController.getPeople();
      socket.send(JSON.stringify({ type: '200', data: people }))
    } else {
      console.log("WRONG PING");
    }

  })
})

module.exports = app;