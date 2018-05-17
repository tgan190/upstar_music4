// const Artist = require('../models/artist');
import axios from 'axios';
/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
export default () => {
    
    // console.log('In GetAgeRange.js');
    return axios.get('http://localhost:5000/api/artist/age-range')
    .then (res => {
        // console.log('In GetAgeRange.js, res = ',res.data);
        return res.data;
    });
};
