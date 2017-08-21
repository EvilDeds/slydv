import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import { fetchDeck, fetchSlideList, changeDeck } from '../store';


class ChatBox extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		currentMessage: "", 
  		chats: []  //at what point do we send the chats to the database. probably "onSubmit" -- need a thunk
  	//on submit, maybe ".join" the array, or change the model to be an array
  	}
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
  	this.setState({currentMessage: e.target.value});
  }
  handleSubmit(e){
  	e.preventDefault();
  	chats.push(this.state.currentMessage);
  	this.setState({currentMessage: ""});
  }

  componentDidMount(){
  	const deckId = +this.props.match.params.deckId; 
  	this.props.loadDeck(deckId);
  }

  render(){
  	let chats = this.state.chats;
  	let email = this.props.user.email;
  	return (
      { deck.id ? 
         (
         	<div className="chat-box">
         	{
         	  chats.map(chat => <div id={Math.random()><span>{ email+ chat }</span><br></div>)
         	}

               <div className="dqpl-field-wrap">
                 <label className="dqpl-label" htmlFor="currentMessage" id="currentMessage-label">Speak!</label>
                 <input className="dqpl-text-input" type="text" id="currentMessage" value={this.state.currentMessage} onChange={this.handleChange} aria-labelledby="title-label" />
              </div> 
         	</div>
         )
      }

  	)
  }
}

const mapState = state => ({
  deck: state.deck, 
  slides: state.slide.slideList,
  user: state.user
});

const mapDispatch = dispatch => ({
	loadDeck(deckId){
		dispatch(fetchDeck(deckId));
	}, 
	loadSlides(deckId){
		dispatch(fetchSlideList(deckId));
	}
})

export default withRouter(connect(mapState, mapDispatch)(ChatBox));