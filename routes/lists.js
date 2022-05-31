var express = require('express');
var router = express.Router();

// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../db');

/* GET users listing. */
router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM lists limit 100', []);
    res.send(rows);
});

/* Query DB to get the userid */
router.get('/:id', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM lists WHERE list_id = $1', [req.params.id]);
    res.send(rows[0]);
});

/* Query DB to add the userid */
router.post('/', async (req, res) => {
    const list = req.body;
    const text = `INSERT INTO lists (title, created_by) VALUES ($1, $2) RETURNING list_id`;
    const values = [list.title, list.created_by];
    const { rows } = await db.query(text, values);
    res.send(rows[0]);
});

/* DB Query to update the userid */
router.put('/:id', (req, res, next) => {
    const list = req.body;
    const text = `UPDATE lists SET title = $2 WHERE list_id = $1`;
    const values = [req.params.id, list.title];
    db.query(text, values, (err, result) => {
        if (err) {
            return next(err)
        }
        res.send(result.rows[0])
    })
});

/* DB Query to delete the list */
router.delete('/:id', (req, res, next) => {
    const text = `DELETE from lists WHERE list_id = $1`;
    const values = [req.params.id];
    db.query(text, values, (err, result) => {
        if (err) {
            return next(err)
        }
        res.send(result.rows[0])
    })
});

module.exports = router;
