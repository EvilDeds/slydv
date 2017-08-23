import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { MarkdownFooter } from './Markdown';
import SlideViewFrame from './SlideViewFrame';
import { getSingleSlide, fetchDeck, viewNavBar, getSlideAndEmit } from '../store';
import socket from '../socket';
import ChatBox from './ChatBox';

import Infinite from 'react-infinite';

class SlideViewLive extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.startSlideShow = this.startSlideShow.bind(this);
  }

  componentDidMount() {
    const deckId = +this.props.match.params.deckId;
    socket.emit('join-room', deckId);
    this.props.showNavBar(false);
    if (!(this.props.deck && this.props.deck.id)
        || (deckId !== this.props.deck.id)) this.props.loadDeck(deckId);
    if (this.props.currentSlide && !this.props.currentSlide.id
        && this.props.slides && this.props.slides.length) this.props.setSlide(this.props.slides[0]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slides && nextProps.slides.length && (nextProps.slides !== this.props.slides)) {
      this.props.setSlide(nextProps.slides[0]);
    }
  }

  componentWillUnmount() {
    this.props.showNavBar(true);
  }

  handleClick(dir) {
    if (this.props.currentSlide.positionInDeck !== 1 && dir === 'prev') {
      const prevSlide = this.props.slides[this.props.currentSlide.positionInDeck - 2];
      if (this.props.viewTypeParam === 'static') {
        this.props.setSlide(prevSlide);
      } else if (this.props.viewTypeParam === 'presenter') {
        this.props.setSlideAndEmit(prevSlide);
      }
    } else if (this.props.currentSlide.positionInDeck !== this.props.slides.length && dir === 'next') {
      const nextSlide = this.props.slides[this.props.currentSlide.positionInDeck];
      if (this.props.viewTypeParam === 'static') {
        this.props.setSlide(nextSlide);
      } else if (this.props.viewTypeParam === 'presenter') {
        this.props.setSlideAndEmit(nextSlide);
      }
    } else {
      this.props.history.push(`/decks/${this.props.deck.id}`);
    }
  }

  startSlideShow(){
    window.open(`/decks/${this.props.deck.id}/live`)
  }

  render() {
    const { currentSlide, deck, slides, viewTypeParam } = this.props;
    const presenterView = viewTypeParam === 'presenter';
    const liveView = viewTypeParam === 'live';
    // Pass presenterView to SlideViewFrame to tell it to render the presenter notes
    const footerClass = deck.hasFooter ? 'has-footer' : null;

    return (
      <DocumentTitle
        title={deck && deck.id && currentSlide && currentSlide.id
          ? `${deck.deckTitle}: Slide ${currentSlide.positionInDeck} | SlyDv` || 'Slideshow | SlyDv'
          : 'SlyDv'}
      >
        <div className={`slide-view-live ${footerClass}`}>
          {deck && deck.id && currentSlide && currentSlide.id
            ? (<SlideViewFrame
              singleSlide={currentSlide}
              currentDeck={deck}
              presenterView={presenterView}
            />)
            : (<h1>Slides not found</h1>)
          }
          {currentSlide && slides && slides.length && deck &&

            <footer className={`footer-${viewTypeParam}`}>
              {!presenterView && deck.hasFooter ? <MarkdownFooter markdown={deck.footerText} /> : null}
              {presenterView && 
              <Infinite containerHeight={200} elementHeight={40}>
                <ChatBox />
              </Infinite>
              }
              {!liveView &&
                <div className="slide-nav">
                  {presenterView &&
                    <button type="button" onClick={this.startSlideShow}>
                      START PRESENTATION
                    </button>
                  }
                  {'   '}
                  <button type="button" onClick={() => this.handleClick('prev')}>
                  &lt;{ currentSlide.positionInDeck === 1 ? 'EXIT' : 'PREV'}
                  </button>
                  {'   '}
                  <button type="button" onClick={() => this.handleClick('next')}>
                    { currentSlide.positionInDeck === slides.length ? 'EXIT' : 'NEXT'}&gt;
                  </button>
                </div>
              }
            </footer>

          }
        </div>
      </DocumentTitle>
    );
  }
}

/* -----CONNECT TO STORE AND PROPS----- */

const mapState = (state, ownProps) => ({
  slides: state.deck.slides,
  currentSlide: state.slide.singleSlide,
  deck: state.deck,
  viewTypeParam: ownProps.match.params.viewTypeParam,
});

const mapDispatch = dispatch => ({
  setSlide(slide) {
    dispatch(getSingleSlide(slide));
  },
  loadDeck(deckId) {
    dispatch(fetchDeck(deckId));
  },
  showNavBar(bool) {
    dispatch(viewNavBar(bool));
  },
  setSlideAndEmit(slide) {
    dispatch(getSlideAndEmit(slide));
  },
});

export default connect(mapState, mapDispatch)(SlideViewLive);

/* -----PROP TYPES AND DEFAULT----- */

SlideViewLive.propTypes = {
  currentSlide: PropTypes.shape().isRequired,
  deck: PropTypes.shape({
    id: PropTypes.number.isRequired,
    footerText: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape().isRequired,
  viewTypeParam: PropTypes.string.isRequired,
  loadDeck: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setSlide: PropTypes.func.isRequired,
  showNavBar: PropTypes.func.isRequired,
  slides: PropTypes.arrayOf(PropTypes.shape()),
};

SlideViewLive.defaultProps = {
  deck: {
    footerText: '',
  },
  slides: [],
};
