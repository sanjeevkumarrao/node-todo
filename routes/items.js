var express = require('express');
var router = express.Router({ mergeParams: true});

// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../db');

/* Query DB to get the userid */
router.get('/', async (req, res) => {
    console.log(req.params);
    const { rows } = await db.query('SELECT * FROM list_items WHERE list_id = $1', [req.params.list_id]);
    res.send(rows);
});

/* Query DB to add the userid */
router.post('/', async (req, res) => {
    const listItem = req.body;
    const text = `INSERT INTO list_items (item_name, list_id) VALUES ($1, $2) RETURNING item_id`;
    const values = [listItem.item_name, listItem.list_id];
    const { rows } = await db.query(text, values);
    res.send(rows[0]);
});

/* DB Query to update the userid */
router.put('/:id', (req, res, next) => {
    const listItem = req.body;
    const text = `UPDATE list_items SET item_name = $3, WHERE item_id = $1  and list_id = $2`;
    const values = [req.params.id, req.params.list_id, listItem.item_name];
    db.query(text, values, (err, result) => {
        if (err) {
            return next(err)
        }
        res.send(result.rows[0])
    })
});

/* DB Query to delete the list */
router.delete('/:item_id', (req, res, next) => {
    const text = `DELETE from list_items WHERE item_id = $1  and list_id = $2`;
    const values = [req.params.item_id, req.params.list_id];
    db.query(text, values, (err, result) => {
        if (err) {
            return next(err)
        }
        res.send(result.rows[0])
    })
});

module.exports = router;
