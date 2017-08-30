module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`);

    socket.on('new-message', (message) => {
      socket.in(message.deckId).broadcast.emit('new-message', message);
    });

    socket.on('join-room', (deckId) => {
      socket.join(deckId);
    });

    socket.on('change-slide', (slide) => {
      socket.in(slide.deckId).broadcast.emit('change-slide', slide);
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has disconnected.`);
    });
  });
};
