const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const imagesDirectory = './public/images';

// 静的ファイルとして画像ディレクトリを公開
app.use('/public', express.static(imagesDirectory));

app.get('/images', (req, res) => {
    fs.readdir(imagesDirectory, (err, files) => {
        if (err) {
            res.status(500).send('Error reading directory');
            return;
        }
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        const imagePaths = imageFiles.map(file => ({
            name: file,
            url: `http://localhost:${port}/public/${file}`
        }));
        res.json(imagePaths);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
