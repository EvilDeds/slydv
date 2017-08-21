import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSlide, fetchSlideList } from '../store';
import history from '../history';

class NewSlideButton extends Component {
  constructor(props) {
    super(props);
    this.newSlide = {
      deckId: 1, 
        title: '',
        firstText: '',
        secondText: '',
        template: 'single-pane',
        codeText: '',
        presenterNotes: '',
        positionInDeck: this.props.positionInDeck,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.sendSlide()
  }
  render() {
    return (
      <button className="dqpl-button-primary new-slide" type="button" onClick={this.handleClick}>New Slide</button>
    );
  }
}

const mapState = state => ({
  deck: state.deck,
});

const mapDispatch = dispatch => ({
  sendSlide(slide) { return dispatch(createSlide(slide)); },
  loadSlides(deckId) { return dispatch(fetchSlideList(deckId)); },
});

export default connect(mapState, mapDispatch)(NewSlideButton);