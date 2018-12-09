'use strict'

// require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 4040;
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HowNice',
  database: 'reddit',
  port: '3306'
});

conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Connection to Db established`);
});

app.use('/assets', express.static('assets'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/posts', (req, res) => {
  conn.query(`SELECT * FROM POSTS`, (err, posts) => {
    if (err) {
      res.status(500).json({
        error: 'Unexpected error',
    })
    } else {
      res.status(200).json({
        posts: posts,
      })
    }
  })
})

app.post('/posts', jsonParser, (req, res) => {
  let postTitle = req.body.title;
  let postURL = req.body.url;
  let postUser = req.body.username;

  if (postTitle && postURL) {
    conn.query(`INSERT INTO posts (title, url, username) values (?, ?, ?);`, [postTitle, postURL, postUser], (err, result) => {
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
        res.redirect('/');
      })
    } 
  )}
})

app.put('/posts/:id/upvote', jsonParser, (req, res) => {
  conn.query(`UPDATE posts SET score = score + 1 WHERE id = ${req.params.id};`), (err, result) => {
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
  }
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

app.delete('/posts/:id', jsonParser, (req, res) => {
  conn.query(`DELETE from posts WHERE id = ${req.params.id};`, (err3, result) => {
    if (err3) {
      console.log(`Database error SPECIFIC DELETE`);
      res.status(500).send(err3.message);
      return;
    } 
    res.redirect('/');
  })
})

app.put('/posts/:id', jsonParser, (req, res) => {
  if (req.body.title && req.body.url) {
    conn.query(`UPDATE posts SET url = '${req.body.url}', title = '${req.body.title}' WHERE posts.id = ${req.params.id};`, (err4) => {
      if (err4) {
        console.log(`Database error UPDATE`);
        res.status(500).send(err4.message);
        return;
      } 
      conn.query(`SELECT * from posts WHERE id = ${req.params.id}`, (err5, specificPost) => {
        if (err5) {
          console.log(`Database error SPECIFIC UPDATE`);
          res.status(500).send(err5.message);
          return;
        } 
        res.status(200).json({
          specificPost,
        })
      })
    })
  } else {
  console.log(`Database error UPDATE`);
  res.status(500).send(`Please enter your data`);
  return;
  }
})

app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});


