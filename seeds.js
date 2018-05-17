const mongoose = require('mongoose');
require ('./models/Artist');

const Artist = mongoose.model('artist');


// import { ValidationError } from 'mongoose';

// import _ from 'lodash';
var _ = require('lodash');
// import faker  from 'faker';
var faker = require ('faker');

// import { Db, Server, connect } from 'mongodb';
//const mongodb = require ('mongodb');
// import { GENRES } from './constants';
require('./constants');

const MINIMUM_ARTISTS = 200;
const ARTISTS_TO_ADD = 1500;

let artistsCollection;

// const totalCount = Artist.count()
Artist.count()
.then((count) => {
  console.log('count = ', count)
  if (count < MINIMUM_ARTISTS) {
     // artistsCollection = db.collection('artists');
     const artists = _.times(ARTISTS_TO_ADD, () => createArtist())
     // console.log('artists array = ',artists);
     Artist.insertMany(artists, (err, results) => {
        console.log('insert many artist, done');
        // console.log('results: ', results);
     });
  } else {
    console.log('total count ', count, ' is already > MINIMUM(2)')
  }
})
  //   .then(count => {
  
  //   })
  //   .catch(e => console.log(e));
  // });

function createArtist() {
  return {
    name: faker.name.findName(),
    age: randomBetween(15, 45),
    yearsActive: randomBetween(0, 15),
    image: faker.image.avatar(),
    genre: getGenre(),
    website: faker.internet.url(),
    netWorth: randomBetween(0, 5000000),
    labelName: faker.company.companyName(),
    retired: faker.random.boolean(),
    albums: getAlbums()
  };
}

function getAlbums() {
  return _.times(randomBetween(0, 5), () => {
    const copiesSold = randomBetween(0, 1000000);

    return {
      title: _.capitalize(faker.random.words()),
      date: faker.date.past(),
      copiesSold,
      numberTracks: randomBetween(1, 20),
      image: getAlbumImage(),
      revenue: copiesSold * 12.99
    };
  });
}

function getAlbumImage() {
  const types = _.keys(faker.image);
  const method = randomEntry(types);

  return faker.image[method]();
}

function getGenre() {
  return randomEntry(GENRES);
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max-min)) + min;
}
