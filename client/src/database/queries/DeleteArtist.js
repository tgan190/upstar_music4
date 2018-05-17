// const Artist = require('../models/artist');
import axios from 'axios';
/**
 * Deletes a single artist from the Artists collection
 * @param {string} _id - The ID of the artist to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
export default (_id) => {

  // axios.delete('http://localhost:5000/api/delete' ,{params:{_id}})
  axios.delete('http://localhost:5000/api/artist/delete' ,{params:{_id: `${_id}`}})
  .then(res => {
      console.log('deleted, res = ',res);
      return res;
  });
};
