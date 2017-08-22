/* global window */
import io from 'socket.io-client';
import store, { getNewMessage } from './store';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
  socket.on('new-message', (message) => {
    store.dispatch(getNewMessage(message));
  });
  // socket.on('join-room', (deckId) => {
  // 	socket.room = deckId
  // 	socket.join(room);
  // 	console.log(socket.room)
  // });
});

export default socket;
