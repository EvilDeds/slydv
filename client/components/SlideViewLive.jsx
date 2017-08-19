// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import SlideViewFrame from './SlideViewFrame';
import { getSingleSlide, fetchSlideList, fetchDeck, viewNavBar } from '../store';

class SlideViewLive extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const deckId = +this.props.match.params.deckId;
    this.props.showNavBar(false);
    if (!(this.props.deck && this.props.deck.id)
      || (deckId !== this.props.deck.id)) {
      this.props.loadDeck(deckId);
    }
    if (!this.props.slides.length) this.props.loadSlides(deckId);
    if (this.props.currentSlide
      && !this.props.currentSlide.id
      && this.props.slides.length) {
      this.props.setSlide(this.props.slides[0]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slides.length && (nextProps.slides !== this.props.slides)) {
      this.props.setSlide(nextProps.slides[0]);
    }
  }

  componentWillUnmount() {
    this.props.showNavBar(true);
  }

  handleClick(dir) {
    if (this.props.currentSlide.positionInDeck !== 1
      && dir === 'prev') {
      this.props.setSlide(this.props.slides[this.props.currentSlide.positionInDeck - 2]);
    }


    if (this.props.currentSlide.positionInDeck !== this.props.slides.length && dir === 'next') {
      this.props.setSlide(this.props.slides[this.props.currentSlide.positionInDeck]);
    }
  }

  render() {
    const { currentSlide, deck, slides } = this.props;
    return (
      <DocumentTitle
        title={deck && deck.id && currentSlide && currentSlide.id
          ? `${deck.title}: Slide ${currentSlide.PositionInDeck} | SlyDv` || 'Slideshow | SlyDv'
          : 'SlyDv'}
      >
        <div className="slide-view-live">
          {deck && deck.id && currentSlide && currentSlide.id
            ? (<SlideViewFrame singleSlide={currentSlide} currentDeck={deck} />)
            : (<h1>Slides not found</h1>)
          }
          <footer className="slide-nav"><button type="button" onClick={() => this.handleClick('prev')}>&lt;PREV</button>   <button type="button" onClick={() => this.handleClick('next')}>NEXT&gt;</button></footer>
        </div>
      </DocumentTitle>
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
  showNavBar(bool) {
    dispatch(viewNavBar(bool));
  },
});

export default connect(mapState, mapDispatch)(SlideViewLive);
