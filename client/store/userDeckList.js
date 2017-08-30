import axios from 'axios';

/* ----------------------- ACTION TYPES ------------------------ */

const GET_USER_DECK_LIST = 'GET_USER_DECK_LIST';

/* ----------------------- INITIAL STATE ----------------------- */

const defaultDeckList = [];

/* ---------------------- ACTION CREATORS ---------------------- */

const getUserDeckList = deckList => ({ type: GET_USER_DECK_LIST, deckList });

/* ---------------------- THUNK CREATORS ---------------------- */

export function fetchUserDeckList(userId) {
  return function thunk(dispatch) {
    return axios.get(`/api/users/${userId}/decks`)
      .then(res => dispatch(getUserDeckList(res.data)))
      .catch(err => console.log(err));
  };
}

/* -------------------------- REDUCER -------------------------- */

export default function (state = defaultDeckList, action) {
  switch (action.type) {
    case GET_USER_DECK_LIST:
      return action.deckList;
    default:
      return state;
  }
}
