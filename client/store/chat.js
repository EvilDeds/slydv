import axios from 'axios';

const initialMessages = [];

// action types
const GET_MESSAGES = 'GET_MESSAGES';
const GET_NEW_MESSAGE = 'GET_NEW_MESSAGE';

// action creators
const getMessages = (messages) => { type: GET_MESSAGES, messages };
const getNewMessage = (message) => { type: GET_NEW_MESSAGE, message };

// thunk creators

export function fetchMessages(deckId) {
  return function thunk(dispatch) {
    return axios.get(`/api/decks/${deckId}/chats`)
      .then(res => dispatch(getMessages(res.data)))
      .catch((err) => { console.error(err) });
  };
}

// reducer
export default function (state = initialMessages, action) {
  switch(action.type) {
    case GET_MESSAGES:
      return action.messages;
    case GET_NEW_MESSAGE:
      return [...state, action.message];
    default:
      return state;
  }
}
