import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Infinite from 'react-infinite';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDeck, fetchSlideList, fetchMessages, postMessage } from '../store';
import socket from '../socket';

/* -------------- COMPONENT -------------- */

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const deckId = +this.props.match.params.deckId;
    this.props.loadDeck(deckId);
    this.props.loadChats(deckId);
    socket.emit('join-room', deckId);
  }

  handleChange(e) {
    this.setState({ currentMessage: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.props.deck.id, this.props.user.id, this.state.currentMessage);
    this.setState({ currentMessage: '' });
  }

  render() {
    const chat = this.props.chat;
    return (
      <div className="chat-box">
        {chat && chat.length
          ? <Infinite className="chat-log" containerHeight={this.props.height || 500} elementHeight={20} displayBottomUpwards >
            {chat.map(message => (<div className="chat-message" key={message.id}><span><b>{`${message.user.email}: `}</b>{message.message}</span></div>))}
          </Infinite>
          : <p>It’s quiet in here, too quiet…</p>
        }
        <form className="dqpl-field-wrap chat-form" onSubmit={this.handleSubmit}>
          <label className="dqpl-label" htmlFor="currentMessage" id="currentMessage-label">Speak!</label>
          <input className="dqpl-text-input" type="text" id="currentMessage" value={this.state.currentMessage} onChange={this.handleChange} aria-labelledby="title-label" />
          <button className="chat-send" type="submit" onClick={this.handleSubmit}>Send</button>
        </form>
      </div>
    );
  }
}

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  deck: state.deck,
  slides: state.slide.slideList,
  user: state.user,
  chat: state.chat,
});

const mapDispatch = dispatch => ({
  loadDeck(deckId) {
    return dispatch(fetchDeck(deckId));
  },
  loadSlides(deckId) {
    return dispatch(fetchSlideList(deckId));
  },
  loadChats(deckId) {
    return dispatch(fetchMessages(deckId));
  },
  sendMessage(deckId, userId, message) {
    return dispatch(postMessage(deckId, userId, message));
  },
});

export default withRouter(connect(mapState, mapDispatch)(ChatBox));

/* -------------- PROP TYPES -------------- */

ChatBox.propTypes = {
  chat: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    id: PropTypes.number,
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
  })),
  deck: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  height: PropTypes.number,
  loadChats: PropTypes.func.isRequired,
  loadDeck: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  sendMessage: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

ChatBox.defaultProps = {
  chat: [],
  height: 500,
  user: {
    id: null,
  },
};
