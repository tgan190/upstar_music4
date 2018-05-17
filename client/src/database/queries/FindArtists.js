import axios from 'axios';
import { DEFAULT_ECDH_CURVE } from 'tls';

// const Artist = require('../models/artist');

/**
 * Finds a single artist in the artist collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the Artist that matches the id
 */

 // module.exports = (_id) => {
 export default () => {
    
    // return axios.get('http://localhost:5000/api/artist-all')
    return axios.get('/api/artist-all')
        .then (res => {
            // console.log('res.data: ',res.data);
            return res.data;
        });
    // return Artist.findOne({_id: _id});
    // return Artist.findById(_id);
};