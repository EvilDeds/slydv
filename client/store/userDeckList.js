import axios from 'axios';
import history from '../history';

//action types

const GET_USER_DECK_LIST = 'GET_USER_DECK_LIST';

// initial state

const initialState = {
	deckList : []
}

// action creators

const getUserDeckList = (deckList) => ({type: GET_USER_DECK_LIST, deckList});

// thunk creators 

export function fetchUserDeckList () {
    return function thunk (dispatch){
        return axios.get('/api/users/:userId/decks')
        .then(res => dispatch(getCatList(res.data)))
        .catch(error => { console.log(error)});
    };
}

//reducer 

export default function (state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_USER_DECK_LIST:
      newState.deckList = action.deckList;
      break;
    default:
      return state;
  }
  return newState;
}
