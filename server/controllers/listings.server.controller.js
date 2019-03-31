/* Dependencies */
var mongoose = require('mongoose'),
  Listing = require('../models/listings.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.
 */

/* Create a listing */
exports.create = function (req, res) {
  var listing = new Listing(req.body);

  listing.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function (req, res) {
  res.json(req.listing);
};

/* Update a listing */
exports.update = function (req, res) {
  var listing = req.listing;

  /** TODO **/
  /* Replace the article's properties with the new properties found in req.body */
  listing.playerName = req.body.playerName;
  listing.cardYear = req.body.cardYear;
  listing.teamName = req.body.teamName;
  listing.cardBrand = req.body.cardBrand;
  listing.playerPosition = req.body.playerPosition;
  listing.sport = req.body.sport;
  listing.linkToFrontImage = req.body.linkToFrontImage;
  listing.linkToBackImage = req.body.linkToBackImage; 


  listing.updated_at = new Date();

  /* Save the article */
  listing.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Delete a listing */
exports.delete = function (req, res) {
  var listing = req.listing;
  /** TODO **/
  /* Remove the article */
  Listing.findByIdAndRemove(req.listing.id, function (err) {
    if (err) {
        console.log(err);
        res.status(404);
        res.send(err);
    } else {
        res.status(200);
        res.end();
    }
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function (req, res) {
  /** TODO **/
  Listing.find().sort('playerName').exec(function (err, listings) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.json(listings);
    }
  });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.
  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function (req, res, next, id) {
  Listing.findById(id).exec(function (err, listing) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};

/*

*/
