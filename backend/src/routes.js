const express = require('express');
const multer = require('multer'); //rota de upload
const uploadConfig = require('./config/upload'); //rota de upload
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/posts', PostController.index); //retornar todos os pots
routes.post('/posts', upload.single('image'), PostController.store); //multer

routes.post('/posts/:id/like', LikeController.store); //realizar likes 

module.exports = routes;
