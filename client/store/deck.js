import axios from 'axios';

/* ----------------------- ACTION TYPES ------------------------ */

const NEW_DECK = 'NEW_DECK';
const UPDATE_DECK = 'UPDATE_DECK';
const GET_DECK = 'GET_DECK';

/* ----------------------- INITIAL STATE ----------------------- */

const defaultDeck = {
  deckTitle: '',
  footerText: '',
  hasFooter: false,
  id: 0,
  theme: 'red',
  userId: 0,
  viewable: false,
};

/* ---------------------- ACTION CREATORS ---------------------- */

const getDeck = deck => ({ type: GET_DECK, deck });
const newDeck = deck => ({ type: NEW_DECK, deck });
const updateDeck = deck => ({ type: UPDATE_DECK, deck });

/* ---------------------- THUNK CREATORS ---------------------- */

export function changeDeck(userId, deck) {
  return function thunk(dispatch) {
    return axios.put(`/api/users/${userId}/decks/${deck.id}`, deck)
      .then(res => dispatch(updateDeck(res.data)))
      .catch(err => console.log(err));
  };
}

export function fetchDeck(deckId) {
  return function thunk(dispatch) {
    return axios.get(`/api/decks/${deckId}`)
      .then(res => dispatch(getDeck(res.data)))
      .catch(err => console.error(err));
  };
}

export function postNewDeck(userId, deck) {
  return function thunk(dispatch) {
    return axios.post(`/api/users/${userId}/decks/`, deck)
      .then(res => dispatch(newDeck(res.data)))
      .catch(err => console.log(err));
  };
}

/* -------------------------- REDUCER -------------------------- */

export default function (state = defaultDeck, action) {
  switch (action.type) {
    case GET_DECK:
      return action.deck;
    case NEW_DECK:
      return action.deck;
    case UPDATE_DECK:
      return action.deck;
    default:
      return state;
  }
}
