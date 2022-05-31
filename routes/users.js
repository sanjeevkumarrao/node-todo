var express = require('express');
var router = express.Router();

// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../db');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { rows } = await db.query('SELECT * FROM users limit 100', []);
  res.send(rows);
});

/* Query DB to get the userid */
router.get('/:id', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.send(rows[0]);
});

/* Query DB to add the userid */
router.post('/', async (req, res) => {
  const person = req.body;
  const text = `INSERT INTO users (fullname, gender, phone, age) VALUES ($1, $2, $3, $4) RETURNING id`;
  const values = [person.fullname, person.gender, person.phone, person.age];
  const { rows } = await db.query(text, values);
  res.send(rows[0]);
});

/* DB Query to update the userid */
router.put('/:id', (req, res, next) => {
  const person = req.body;
  const text = `UPDATE people SET fullname = $2, phone = $3 WHERE id = $1`;
  const values = [req.params.id, person.fullname, person.phone];
  db.query(text, values, (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
});

module.exports = router;
