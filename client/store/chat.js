import axios from 'axios';
import socket from '../socket';

const initialMessages = [];

// action types
const GET_MESSAGES = 'GET_MESSAGES';
const GET_NEW_MESSAGE = 'GET_NEW_MESSAGE';
const CLEAR_CHATS = 'CLEAR_CHATS';


// action creators
const getMessages = messages => ({ type: GET_MESSAGES, messages });
export const getNewMessage = message => ({ type: GET_NEW_MESSAGE, message });
const clearChats = () => ({ type: CLEAR_CHATS, messages: [] });
// thunk creators

export function fetchMessages(deckId) {
  return function thunk(dispatch) {
    return axios.get(`/api/decks/${deckId}/chats`)
      .then(res => dispatch(getMessages(res.data)))
      .catch((err) => { console.error(err) });
  };
}

export function postMessage(deckId, userId, message) {
  return function thunk(dispatch) {
    return axios.post(`/api/decks/${deckId}/chats`, { deckId, userId, message})
      .then((res) => {
        dispatch(getNewMessage(res.data));
        socket.emit('new-message', res.data);
      })
      .catch((err) => console.error(err));
  };
}

export function deleteChatLog(deckId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/decks/${deckId}/chats`)
      .then((res) => {
        dispatch(clearChats(res.data))
      })
      .catch((err) => console.error(err))
  }
}
// reducer
export default function (state = initialMessages, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    case GET_NEW_MESSAGE:
      return [...state, action.message];
    case CLEAR_CHATS:
      return action.messages;
    default:
      return state;
  }
}
