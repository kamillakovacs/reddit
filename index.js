'use strict'

const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mysql = require('mysql');
// const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const conn = mysql.createConnection({
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
      res.status(200).json({
        posts,
      })
    }
  })
})

app.post('/posts', jsonParser, (req, res) => {
  let postTitle = req.body.title;
  let postURL = req.body.url;

  if (postTitle && postURL) {
    conn.query(`INSERT INTO posts (title, url) values ('${postTitle}', '${postURL}');`, (err, result) => {
      if (err) {
        console.log(`Database error POST`);
        res.status(500).send(err.message);
        return;
      } 
      conn.query(`SELECT * from posts WHERE id = ${result.insertId};`, (err, specificPost) => {
        if (err) {
          console.log(`Database error SPECIFIC POST`)
          res.status(500).send(err.message)
          return;
        } 
        res.status(200).json({
          specificPost,
        })
      })
    } 
  )}
})

app.put('/posts/:id/upvote', jsonParser, (req, res) => {
  conn.query(`UPDATE posts SET score = score + 1 WHERE id = ${req.params.id};`, (err, result) => {
    if (err) {
      console.log(`Database error PUT UP`);
      res.status(500).send(err.message);
      return;
    } 
    conn.query(`SELECT * from posts WHERE id = ${req.params.id}`, (err2, specificPost) => {
      if (err2) {
        console.log(`Database error SPECIFIC PUT UP`)
        res.status(500).send(err2.message)
        return;
      } 
      res.status(200).json({
        posts: specificPost,
      })
    })
  })
})

app.put('/posts/:id/downvote', jsonParser, (req, res) => {
  conn.query(`UPDATE posts SET score = score - 1 WHERE id = ${req.params.id};`, (err, result) => {
    if (err) {
      console.log(`Database error PUT DOWN`);
      res.status(500).send(err.message);
      return;
    } 
    conn.query(`SELECT * from posts WHERE id = ${req.params.id}`, (err2, specificPost) => {
      if (err2) {
        console.log(`Database error SPECIFIC PUT DOWN`)
        res.status(500).send(err2.message)
        return;
      } 
      res.status(200).json({
        posts: specificPost,
      })
    })
  })
})

app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});


