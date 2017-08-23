import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchDeck, fetchSlideList, fetchMessages, postMessage } from '../store';
import socket from '../socket';


class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ currentMessage: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.sendMessage(this.props.deck.id, this.props.user.id, this.state.currentMessage);
    this.setState({ currentMessage: '' });
  }

  componentDidMount(){
    const deckId = +this.props.match.params.deckId;
    this.props.loadDeck(deckId);
    this.props.loadChats(deckId);
    socket.emit('join-room', deckId);
  }

  // componentWillReceiveProps(nextProps){
  //   if (this.props.chats.length !== nextProps.chats.length){

  //   }
  // }

  render() {
    const chat = this.props.chat;
    const deck = this.props.deck;
    return (
      <form className="chat-box" onSubmit={this.handleSubmit}>
       <div className="chat-log">
        {chat && chat.length ?
          chat.map(message => (<div key={message.id}><span>{`${message.user.email} : ${message.message}`}</span></div>)) :
          <p>It's quiet in here, too quiet...</p>
        }
        </div>
        <div className="dqpl-field-wrap chat-form">
          <label className="dqpl-label" htmlFor="currentMessage" id="currentMessage-label">Speak!</label>
          <input className="dqpl-text-input" type="text" id="currentMessage" value={this.state.currentMessage} onChange={this.handleChange} aria-labelledby="title-label" />
        </div>
        <button type="submit" onClick={this.handleSubmit}>Send</button>
      </form>
    );
  }
}

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
