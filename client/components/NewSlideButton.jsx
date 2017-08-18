import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSlide, fetchSlideList } from '../store';

//things we need -- what deck, decklength

class NewSlideButton extends Component {
	constructor(props){
		super(props)
		this.state = {
		  deck : this.props.deck,
		  deckPosition: 0
		}
		this.handleClick = this.handleClick.bind(this);
	}
  componentDidMount(){
  	const blankSlide = {
      title: '',
      firstText: '',
      secondText: '',
      template: 'single-pane',
      codeText: '',
      presenterNotes: ''
     }

 	this.props.getDeckLength(this.state.deck.id)
 	.then((slides) => blankSlide.positionInDeck = slides.length )
 }

 handleClick(){
 	this.props.sendSlide()
 	.then((slide) => history.push(`/slides/${slide.id}`))
 }
 render(){
 	return (
      <button className="dqpl-button-primary new-slide" type="button">New Slide</button>
 	)
 }
}

const mapState = state => ({
  deck: state.deck
});

const mapDispatch = dispatch => ({
  sendSlide(){ return dispatch(createSlide())},
  getDeckLength(deckId){ return dispatch(fetchSlideList(deckId))}
});

export default withRouter(connect(mapState, mapDispatch)(NewSlideButton));




