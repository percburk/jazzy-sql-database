const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pool = require('./modules/pool.js');
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.get('/artist', (req, res) => {
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

// /artist routes
app.post('/artist', (req, res) => {
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

// /song routes
app.get('/song', (req, res) => {
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

app.post('/song', (req, res) => {
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

// app listen
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

// TODO - Replace static content with a database tables
// const artistList = [
//     {
//         name: 'Ella Fitzgerald',
//         birthdate: '04-25-1917'
//     },
//     {
//         name: 'Dave Brubeck',
//         birthdate: '12-06-1920'
//     },
//     {
//         name: 'Miles Davis',
//         birthdate: '05-26-1926'
//     },
//     {
//         name: 'Esperanza Spalding',
//         birthdate: '10-18-1984'
//     },
// ]
// const songList = [
//     {
//         title: 'Take Five',
//         length: '5:24',
//         released: '1959-09-29'
//     },
//     {
//         title: 'So What',
//         length: '9:22',
//         released: '1959-08-17'
//     },
//     {
//         title: 'Black Gold',
//         length: '5:17',
//         released: '2012-02-01'
//     }
// ];

// app.get('/artist', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(artistList);
// });

// app.post('/artist', (req, res) => {
//     artistList.push(req.body);
//     res.sendStatus(201);
// });

// app.get('/song', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(songList);
// });

// app.post('/song', (req, res) => {
//     songList.push(req.body);
//     res.sendStatus(201);
// });
