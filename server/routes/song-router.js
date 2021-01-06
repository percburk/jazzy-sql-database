const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const queryText = `
		SELECT * FROM "song" ORDER BY "title";
	`;

  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  let newSong = req.body;

  const queryText = `
		INSERT INTO "song" ("title", "length", "released")
		VALUES ($1, $2, $3);
	`;

  pool
    .query(queryText, [newSong.title, newSong.length, newSong.released])
    .then((result) => {
      console.log(result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
