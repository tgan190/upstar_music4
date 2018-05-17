import axios from 'axios';
// const Artist = require('../models/artist');

/**
 * Sets a group of Artists as retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */
export default (_ids) => {
    console.log('In SetRetired.js, _ids: ', _ids);
    // return axios.put('http://localhost:5000/api/artist/update', 
    // artistProps,{params:{_id: `${_id}`}})
    return axios.put('http://localhost:5000/api/artist/set-retired', 
    _ids,)
    .then (res => {
        console.log('In SetRetired.js, res = ',res);
        return res.data;
    });
};
