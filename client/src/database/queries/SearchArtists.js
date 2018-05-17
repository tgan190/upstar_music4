import axios from 'axios';
// const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */

export default (criteria, sortProperty, offset = 0, limit = 10) => {

    console.log('SearchArtists.js, criteria: ',criteria);
    console.log('sortProperty ',sortProperty);
    // const config = {params:
    //                 {sortProperty: `${sortProperty}`, xlimit: `${limit}`, criteria: stringify(criteria)}
    //                };
    
    // criteria.age = {max:89, min:26}
    
    // let testCriteria = {name: "", age: {max:50, min:21} }
    const config = {params:
                    {sortProperty: `${sortProperty}`, xlimit: `${limit}`, criteria: criteria, offset: offset}
                   };
    return axios.get('/api/artist/search', config)
        .then (res => {
            const {artists, count} = res.data;
            console.log('In SearchArtists, res.data: ',res.data);
            return {all: artists, count: count, offset: offset, limit: limit};
        });
    // return Artist.findOne({_id: _id});
    // return Artist.findById(_id);
};