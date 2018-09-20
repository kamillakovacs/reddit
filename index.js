'use strict'

const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mysql = require('mysql');
// const cors = require('cors');

const conn = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'HowNice',
  database: `reddit`,
});

app.use('/assets', express.static('assets'));
// app.use(cors());

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// })

app.get('/hello', (req, res) => {
  console.log('hello world');
})

app.get('/posts', (req, res) => {
  conn.query(`SELECT * FROM POSTS`, (err, posts) => {
    if (err) {
      res.json({
        error: err.message,
      })
    } else {
      res.status(200).json( {
          posts,
      })
    }
  })
})


app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});


