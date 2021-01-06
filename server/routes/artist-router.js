const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const queryText = `
		SELECT * FROM "artist" ORDER BY "birthdate" DESC;
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
  let newArtist = req.body;

  const queryText = `
		INSERT INTO "artist" ("name", "birthdate")
		VALUES ($1, $2);
	`;

  pool
    .query(queryText, [newArtist.name, newArtist.birthdate])
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