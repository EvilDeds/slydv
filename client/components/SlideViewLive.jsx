import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideViewFrame from './SlideViewFrame';
import { getSingleSlide, fetchSlideList, fetchDeck } from '../store';

class SlideViewLive extends Component {
  componentDidMount() {
    console.log(this.props.currentSlide)
    const deckId = +this.props.match.params.deckId;
    if (!this.props.deck.id || deckId !== this.props.deck.id) this.props.loadDeck(deckId);
    if (!this.props.slides.length) this.props.loadSlides(deckId);
    if (!this.props.currentSlide.id) this.props.setSlide(this.props.slides[0]);
  }

  render() {
    console.log('PROPS: ', this.props)
    const { currentSlide, deck, slides } = this.props;
    return (
      <div>
        {deck && slides
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
});

export default connect(mapState, mapDispatch) (SlideViewLive)