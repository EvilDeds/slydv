/* global window */
import io from 'socket.io-client';
import store, { getNewMessage, getSingleSlide } from './store';



if(!global.window){
  console.log("SHOULDNT BE HERE")
  const MockBrowser = require('mock-browser').mocks.MockBrowser
  global.window = new MockBrowser().getWindow();
}else{
  console.log('should be here')
}

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');

  socket.on('new-message', (message) => {
    store.dispatch(getNewMessage(message));
  });

  socket.on('change-slide', (slide) => {
    store.dispatch(getSingleSlide(slide));
  });
});

export default socket;
