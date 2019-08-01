const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); // Lidar com rotas, parametros e respostas para os usuários

const server = require('http').Server(app); // Protocolo Http
const io = require('socket.io')(server); // Receber e enviar requisições para usuários conectados na aplicação

mongoose.connect('mongodb+srv://semana:semana@cluster0-tahug.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

app.use((req, res, next) => { // Resposta do IO dentro de todos os Controllers
  req.io = io;
  next();
});

app.use(cors()); // Todas as Urls de diferents IPs podem acessar

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); // arquivos estáticos -- imagens

app.use(require('./routes')); // declarar rotas

server.listen(3333);



