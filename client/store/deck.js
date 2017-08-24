import axios from 'axios';


// action types
const NEW_DECK = 'NEW_DECK';
const UPDATE_DECK = 'UPDATE_DECK';
const GET_DECK = 'GET_DECK';
const DELETE_DECK = 'DELETE_DECK';

// initial state

const defaultDeck = {
  deckTitle: '',
  footerText: '',
  hasFooter: false,
  id: 0,
  theme: 'red',
  userId: 0,
  viewable: false,
};

// action creators

const updateDeck = deck => ({ type: UPDATE_DECK, deck });
const newDeck = deck => ({ type: NEW_DECK, deck });
const getDeck = deck => ({ type: GET_DECK, deck });
const deleteDeck = deck => ({type: DELETE_DECK, deck : {}})

// thunk creators

export function changeDeck(userId, deck) {
  return function thunk(dispatch) {
    return axios.put(`/api/users/${userId}/decks/${deck.id}`, deck)
      .then(res => dispatch(updateDeck(res.data)))
      .catch((error) => { console.log(error); });
  };
}

export function postNewDeck(userId, deck) {
  return function thunk(dispatch) {
    return axios.post(`/api/users/${userId}/decks/`, deck)
      .then(res => dispatch(newDeck(res.data)))
      .catch((error) => { console.log(error); });
  };
}

export function fetchDeck(deckId) {
  return function thunk(dispatch) {
    return axios.get(`/api/decks/${deckId}`)
      .then(res => dispatch(getDeck(res.data)))
      .catch(err => console.error(err));
  };
}

export function destroyDeck(deckId){
  return function thunk(dispatch) {
    return axios.delete(`/api/decks/delete/${deckId}`)
      .then(res => dispatch(deleteDeck(deckId)))
      .catch(err => console.error(err));
  }
}

// reducer

export default function (state = defaultDeck, action) {
  switch (action.type) {
    case NEW_DECK:
      return action.deck;
    case UPDATE_DECK:
      return action.deck;
    case GET_DECK:
      return action.deck;
    default:
      return state;
  }
}
