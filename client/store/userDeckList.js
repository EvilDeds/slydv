import axios from 'axios';
import history from '../history';

//action types

const GET_USER_DECK_LIST = 'GET_USER_DECK_LIST';

// initial state

const defaultDeckList = []

// action creators

const getUserDeckList = (deckList) => ({type: GET_USER_DECK_LIST, deckList});

// thunk creators 

export function fetchUserDeckList (userId) {
    return function thunk (dispatch){
        return axios.get(`/api/users/${userId}/decks`)
        .then(res => dispatch(getUserDeckList(res.data)))
        .catch(error => { console.log(error)});
    };
}

//reducer 

export default function (state = defaultDeckList, action) {
  
  switch (action.type) {
    case GET_USER_DECK_LIST:
      return action.deckList;
    default:
      return state;
  }
  
}
