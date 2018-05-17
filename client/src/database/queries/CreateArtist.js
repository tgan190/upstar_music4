import axios from 'axios';
// const Artist = require('../models/artist');
/**
 * Finds a single artist in the artist collection.
 * @param {object} artistProps - Object containing a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves with the Artist that was created
 */
// module.exports = (artistProps) => {
export default (artistProps) => {
    // console.log(artistProps);
    return axios.post('http://localhost:5000/api/artist/new',artistProps)
        .then (res => {
            // console.log('CreateArtist, res.data for create: ',res.data);
            return res.data;
            
        });
};
