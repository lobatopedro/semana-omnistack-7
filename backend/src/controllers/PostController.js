const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt'); //Todos os posts ordenados por data de criação
        
        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags} = req.body; //Recebe os dados dos arquivos e outros do post
        const { filename: image} = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;
        
        //return res.json(req.file);

        await sharp(req.file.path) //Redimensiona a imagem para 500 pixels
        .resize(500)
        .jpeg({ quality : 70})
        .toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        )

        fs.unlinkSync(req.file.path); //salva apenas as imagens redimensionadas

        const post = await Post.create({ //salva no DB
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post); //Envia info em tempo real

        return res.json(post);
    }
};