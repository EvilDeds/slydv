import axios from 'axios';

// action types
const NEW_DECK = 'NEW_DECK';
const UPDATE_DECK = 'UPDATE_DECK';

// initial state

const defaultDeck = {
  userId : "",
  deckTitle: "",
  viewable: false,
  chats: "",
  theme: "red",
  hasFooter: false,
}

// action creators

const updateDeck = deck => ({ type: UPDATE_DECK, deck });
const newDeck = deck => ({ type: NEW_DECK, deck });

// thunk creators

export function changeDeck(userId, deck){
  return function thunk(dispatch) {
    axios.put(`/api/users/${userId}/decks/${deckId}`, deck)
    .then(res => dispatch(updateDeck(res.data)))
    .catch((error) => { console.log(error); });
  }
}

export function postNewDeck(userId, deck){
  return function thunk(dispatch) {
    axios.post(`api/users/${userId}/decks/`, deck)
    .then(res => dispatch(newDeck(res.data)))
    .catch((error) => { console.log(error); });
  }
}

// reducer

export default function (state = defaultDeck, action) {
  switch (action.type) {
    case NEW_DECK:
    return action.deck;
  case UPDATE_DECK:
    return action.deck;
  default:
    return state;
  }
}
