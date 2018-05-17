import _ from 'lodash';
// import { hashHistory } from 'react-router';
import {withRouter} from 'react-router-dom';
import history from '../history';

import {
  SET_AGE_RANGE,
  SET_YEARS_ACTIVE_RANGE,
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST,
  CREATE_ERROR,
  CLEAR_ERROR,
  DESELECT_ARTIST,
  SELECT_ARTIST,
  RESET_SELECTION
} from './types';

import GetAgeRange from '../database/queries/GetAgeRange';
import GetYearsActiveRange from '../database/queries/GetYearsActiveRange';
import SearchArtists from '../database/queries/SearchArtists';
import FindArtist from '../database/queries/FindArtist';
import CreateArtist from '../database/queries/CreateArtist';
import EditArtist from '../database/queries/EditArtist';
import DeleteArtist from '../database/queries/DeleteArtist';
import SetRetired from '../database/queries/SetRetired';
import SetNotRetired from '../database/queries/SetNotRetired';

export const resetArtist = () => {
  return { type: RESET_ARTIST };
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};

export const selectArtist = id => {
  return { type: SELECT_ARTIST, payload: id };
};

export const deselectArtist = id => {
  return { type: DESELECT_ARTIST, payload: id };
};

export const setRetired = ids => (dispatch, getState) =>
  SetRetiredProxy(ids.map(id => id.toString()))
    .then(() => dispatch({ type: RESET_SELECTION }))
    .then(() => refreshSearch(dispatch, getState));

export const setNotRetired = ids => (dispatch, getState) =>
  SetNotRetiredProxy(ids.map(id => id.toString()))
    .then(() => dispatch({ type: RESET_SELECTION }))
    .then(() => refreshSearch(dispatch, getState));

export const setAgeRange = () => dispatch =>
  GetAgeRangeProxy()
    .then(result =>
      dispatch({ type: SET_AGE_RANGE, payload: result })
    );

export const setYearsActiveRange = () => dispatch =>
  GetYearsActiveRangeProxy()
    .then(result =>
      dispatch({ type: SET_YEARS_ACTIVE_RANGE, payload: result })
    );

export const searchArtists = (...criteria) => dispatch =>
  SearchArtistsProxy(...criteria)
    .then((result = []) =>
      dispatch({ type: SEARCH_ARTISTS, payload: result })
    );

export const findArtist = id => dispatch => 
  // console.log('in findArtist');
  // console.log('id = ',id);
  FindArtistProxy(id)
    .then(artist =>
      dispatch({ type: FIND_ARTIST, payload: artist })
    );
  
export const createArtist = (artistInput) => dispatch =>
  // console.log('createArtist props=', props);
  // this.props - undefined
  // console.log('createArtist this.props=', this.props);
  // console.log('In createArtist, form artistInput = ',artistInput);
  CreateArtistProxy(artistInput)
    .then(artist => {
      if (artist) {
        // console.log('In CreateArtistProxy then',artist);
        // this.props.history.push(`artists/${artist.id}`);
        history.push(`/artists/${artist._id}`);
      }
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });

// export const createArtist = withRouter(createArtist2);

export const editArtist =  (id, props) => dispatch =>
  EditArtistProxy(id, props)
    // .then(() => this.props.history.push(`artists/${id}`))
    .then(() => history.push(`/artists/${id}`))
    .catch(error => {
      console.log(error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });
  
// export const editArtist=withRouter(editArtist2);

export const deleteArtist = (id) => dispatch =>
  DeleteArtistProxy(id)
    .then(() => history.push('/'))
    .catch(error => {
      console.log(error);
      dispatch({ type: CREATE_ERROR, payload: error });
    });

// export const deleteArtist = withRouter(deleteArtist2);

//
// Faux Proxies

const GetAgeRangeProxy = async (...args) => {
  const result = await GetAgeRange(...args);
  // if (!result || !result.then) {
  //   return new Promise(() => {});
  // }
  return result;
};

const GetYearsActiveRangeProxy = async (...args) => {
  const result = await GetYearsActiveRange(...args);
  // if (!result || !result.then) {
  //   return new Promise(() => {});
  // }
  return result;
};

const SearchArtistsProxy = async (criteria, offset, limit) => {
  const result = await SearchArtists(_.omit(criteria, 'sort'), criteria.sort, offset, limit);
  // if (!result || !result.then) {
  //   return new Promise(() => {});
  // }
  return result;
};

const FindArtistProxy = async (...args) => {
  // console.log('in FindArtistProxy, before FindArtist');
  // console.log('args in FindArtistProxy',args);
  const result = await FindArtist(...args);
  // console.log('result in FindArtistProxy', result);
  // if (!result || !result.then) {
  //   return new Promise(() => {});
  // }
  // console.log('In FindArtistProxy, before return result');
  return result;
};

const CreateArtistProxy = async (...args) => {
  // console.log('CreateArtistProxy args= ',args);
  const result = await CreateArtist(...args);
  // if (!result || !result.then) {
  //   return new Promise(() => {});
  // }
  // console.log('args in CreatArtistProxy',args);
  // console.log('result in CreatArtistProxy', result);
  return result;
};

const EditArtistProxy = async (...args) => {
  const result = await EditArtist(...args);
  // if (!result || !result.then) {
  //   return new Promise(() => {});
  // }
  return result;
};

const DeleteArtistProxy = async (...args) => {
  const result = await DeleteArtist(...args);
  // if (!result || !result.then) {
  //   return new Promise(() => {});
  // }
  return result;
};

const SetRetiredProxy = (_ids) => {
  const result = SetRetired(_ids);
  // if (!result || !result.then) {
  //   return new Promise(() => {});
  // }
  return result;
};

const SetNotRetiredProxy = (_ids) => {
  const result = SetNotRetired(_ids);
  // if (!result || !result.then) {
  //   return new Promise(() => {});
  // }
  return result;
};

//
// Helpers

const refreshSearch = (dispatch, getState) => {
  const { artists: { offset, limit } } = getState();
  const criteria = getState().form.filters.values;
  if (!criteria.sort) {
    criteria.sort = 'name';
  }
  console.log ('criteria in refreshSearch: ', criteria);
  dispatch(searchArtists({ name: '', ...criteria }, offset, limit));
  // searchArtists({ name: '', ...criteria }, offset, limit);
};
