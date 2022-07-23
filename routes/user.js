const db = require('../db');
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
  db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results['rows']);
  })
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results['rows']);
  })
})

router.post('/', async (req, res) => {
  const { name, email } = req.body;

  db.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        message: `User added with ID: ${results['rows'][0]['id']}`,
        newUser: results['rows']
      });
    })
})

router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  const id = parseInt(req.params.id, 10);

  db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({
        message: `User id ${id} updated.}`,
      });
    }
  )
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.query('DELETE FROM users WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({message: `User id ${id} deleted.`});
    })
})
