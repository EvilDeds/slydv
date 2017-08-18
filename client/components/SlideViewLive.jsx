import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideViewFrame from './SlideViewFrame';
import { getSingleSlide, fetchSlideList, fetchDeck, viewNavBar } from '../store';

class SlideViewLive extends Component {
  componentDidMount() {
    const deckId = +this.props.match.params.deckId;
    this.props.hideNavBar();
    if (!(this.deck && this.props.deck.id) || (deckId !== this.props.deck.id)) this.props.loadDeck(deckId);
    if (!this.props.slides.length) this.props.loadSlides(deckId);
    if (!this.props.currentSlide.id && this.props.slides.length) this.props.setSlide(this.props.slides[0]);
  }

  componentWillRecieveProps () {
    //NEED TO SET CURRENT SLIDE IF RECEIVE SLIDES
  }

  render() {
    console.log('PROPS: ', this.props)
    const { currentSlide, deck, slides } = this.props;
    return (
      <div>
        {deck && deck.id && currentSlide && currentSlide.id
          ? (<SlideViewFrame singleSlide={currentSlide} currentDeck={deck} />)
          : (<h1>Slides not found</h1>)
        }
      </div>
    );
  }
}

const mapState = state => ({
  slides: state.slide.slideList,
  currentSlide: state.slide.singleSlide,
  deck: state.deck,
});

const mapDispatch = dispatch => ({
  loadSlides(deckId) {
    dispatch(fetchSlideList(deckId));
  },
  setSlide(slide) {
    dispatch(getSingleSlide(slide));
  },
  loadDeck(deckId) {
    dispatch(fetchDeck(deckId));
  },
  hideNavBar() {
    dispatch(viewNavBar(false));
  }
});

export default connect(mapState, mapDispatch) (SlideViewLive)
