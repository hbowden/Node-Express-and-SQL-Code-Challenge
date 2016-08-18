var express = require('express');
var router = express.Router();
var rand = require('../rand/rand')
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/animals';

router.get('/', function(req, res) {
  // Connect to the database.
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    // Get all the animals and send them back.
    client.query('SELECT * FROM animals', function (err, result) {
                  done();
                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.send(result.rows);
                  }
                });
  });
});

router.post('/', function(req, res) {
  // Get the animal object form the request body.
  var animal = req.body;

  // Get number of animals.
  var totalAnimals = rand.number(1, 100);

  // Connect to the database.
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    // Save the new animal into the database.
    client.query('INSERT INTO animals (animal_type, total_animals) '
                + 'VALUES ($1, $2)',
                [animal.animal, totalAnimals],
                function (err, result) {
                  done();

                  if (err) {
                    res.sendStatus(500);
                  } else {
                    res.sendStatus(201);
                  }
                });
  });
});

module.exports = router;
