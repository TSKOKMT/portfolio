const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// publicフォルダを静的ファイルとして設定
app.use(express.static('public'));

// サーバー起動
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// imagesディレクトリのパス
const imagesDir = path.join(__dirname, 'public/images');

// ソケット接続処理
io.on('connection', (socket) => {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Failed to read directory:', err);
      return;
    }

    // 拡張子が jpg, jpeg, png, gif のいずれかであるファイルをフィルタリング
    files.forEach(file => {
      if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
        const imagePath = `/images/${file}`;
        socket.emit('image', imagePath);
      }
    });
  });

  // ソケット切断時の処理
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
