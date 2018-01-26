'use strict';

const express = require("express")
const app = express()
const server = require("http").createServer(app)
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 4001

const io = require('socket.io')(server);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extented: true}))
app.use(cors())

import pluginController from "./controllers/PluginController"

app.get("/requests", pluginController.getAllPluginsRequest);

app.post("/request/:requestId", pluginController.doRequest)

app.post("/request/:requestId/:monnaie", pluginController.doRequest)

io.sockets.on('connection', (client) => {
  client.on('change', pluginController.addClientSocket(client));
});

server.listen(port)
