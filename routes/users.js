const db = require('../db');

const getUsers = (req, res) => {
  db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    // console.log(process.env.DATABASE);
    if (error) {
      throw error;
    }
    res.status(200).json(results['rows']);
  })
}

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results['rows']);
  })
}

const createUser = (req, res) => {
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
}

const updateUser = (req, res) => {
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
        updatedUser: results
      });
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  db.query('DELETE FROM users WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({message: `User id ${id} deleted.`});
    })
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
}
