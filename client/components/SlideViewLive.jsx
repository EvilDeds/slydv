import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideViewFrame from './SlideViewFrame';
import { getSingleSlide, fetchDeck, viewNavBar } from '../store';

class SlideViewLive extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const deckId = +this.props.match.params.deckId;
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
      this.props.setSlide(this.props.slides[this.props.currentSlide.positionInDeck - 2]);
    } else if (this.props.currentSlide.positionInDeck !== this.props.slides.length && dir === 'next') {
      this.props.setSlide(this.props.slides[this.props.currentSlide.positionInDeck]);
    } else {
      this.props.history.push(`/decks/${this.props.deck.id}`);
    }
  }

  render() {
    const { currentSlide, deck, slides, liveOrPresenter } = this.props;
    const presenterView = liveOrPresenter === 'presenter';
    // Pass presenterView to SlideViewFrame to tell it to render the presenter notes

    return (
      <div>
        {deck && deck.id && currentSlide && currentSlide.id
          ? (<SlideViewFrame
            singleSlide={currentSlide}
            currentDeck={deck}
            presenterView={presenterView}
          />)
          : (<h1>Slides not found</h1>)
        }
        {currentSlide && slides && slides.length &&
          <footer id="slideNav">
            <button type="button" onClick={() => this.handleClick('prev')}>
              &lt;{ currentSlide.positionInDeck === 1 ? 'EXIT' : 'PREV'}
            </button>
            {'   '}
            <button type="button" onClick={() => this.handleClick('next')}>
              { currentSlide.positionInDeck === slides.length ? 'EXIT' : 'NEXT'}&gt;
            </button>
          </footer>}
      </div>
    );
  }
}

/* -----CONNECT TO STORE AND PROPS----- */

const mapState = (state, ownProps) => ({
  slides: state.deck.slides,
  currentSlide: state.slide.singleSlide,
  deck: state.deck,
  liveOrPresenter: ownProps.match.params.liveOrPresenter,
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
});

export default connect(mapState, mapDispatch)(SlideViewLive);

/* -----PROP TYPES AND DEFAULT----- */

SlideViewLive.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape()),
  currentSlide: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    firstText: PropTypes.string,
    secondText: PropTypes.string,
    template: PropTypes.string,
    codeText: PropTypes.string,
    positionInDeck: PropTypes.number,
    presenterNotes: PropTypes.string,
  }),
  deck: PropTypes.shape({
    id: PropTypes.number,
    deckTitle: PropTypes.string,
    viewable: PropTypes.bool,
    chats: PropTypes.string,
    theme: PropTypes.string,
    hasFooter: PropTypes.bool,
    footer: PropTypes.string,
  }),
  liveOrPresenter: PropTypes.string.isRequired,
  showNavBar: PropTypes.func.isRequired,
  setSlide: PropTypes.func.isRequired,
};

SlideViewLive.defaultProps = {
  slides: [],
  currentSlide: {
    id: 1,
    title: '__This is a slide title__',
    firstText: '# Slide text\nThis is the text of a slide, which is in Markdown.!',
    secondText: '%%%!It has two columns, separated by an unlikely sequence of punctuation marks.',
    template: 'repl',
    codeText: 'let foo = 6; let bar = 7; let baz = foo + bar; baz();',
    positionInDeck: 1,
    presenterNotes: 'This is a speaker note in Markdown.',
  },
  deck: {
    id: 1,
    deckTitle: 'Test Deck',
    viewable: true,
    chats: '',
    theme: 'red',
    hasFooter: true,
    footer: 'Glorious Presentation by Footer McFootery\n[fmcfootery@mcfootery.com](fmcfootery@mcfootery.com)',
  },
  liveOrPresenter: 'live',
};
