import axios from 'axios';
// const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
export default () => {
    // console.log('In GetYearsActiveRange.js');
    return axios.get('http://localhost:5000/api/artist/years-active-range')
    .then (res => {
        // console.log('In GetYearsActiveRange.js, res = ',res.data);
        return res.data;
    });
};
