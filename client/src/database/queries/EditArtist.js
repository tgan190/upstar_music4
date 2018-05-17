import axios from 'axios';
// const Artist = require('../models/artist');

/**
 * Edits a single artist in the Artists collection
 * @param {string} _id - The ID of the artist to edit.
 * @param {object} artistProps - An object with a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves when the record is edited
 */
export default (_id, artistProps) => {
    console.log('In EditArtist.js, artistProps: _id: ',artistProps, _id);
    // return axios.put('http://localhost:5000/api/artist/update', 
    // artistProps,{params:{_id: `${_id}`}})
    return axios.put('http://localhost:5000/api/artist/update', 
    artistProps,{params:{_id: `${_id}`}})
    .then (res => {
        console.log('In EditArtist.js, res = ',res);
        return res.data;
    });
};
