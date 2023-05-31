const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product'
});

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM barang',
    (error, results) => {
      res.render('dashboard.ejs', {items: results});
    }
  );
});

app.get('/add', (req, res) => {
  res.render('create.ejs');
});

app.post('/add', (req, res) => {
  connection.query(
    'INSERT INTO barang (name, brand, price, description) VALUES (?, ?, ?, ?)',
    [req.body.name, req.body.brand, req.body.price, req.body.description],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM barang WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.get('/update/:id', (req, res) => {
  connection.query(
    'SELECT * FROM barang WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('update.ejs', {item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'update barang set name=?, brand=?, price=?, description=? where id=?',
    [req.body.name, req.body.brand, req.body.price, req.body.description, req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.listen(3000);
