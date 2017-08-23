import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { getSingleSlide, fetchDeck, viewNavBar, getSlideAndEmit } from '../store';
import socket from '../socket';
import { MarkdownAside } from './Markdown';

class RemoteControl extends Component {
  constructor() {
    super();
    this.state = {
      showNotes: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePresenter = this.handlePresenter.bind(this);
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
      this.props.setSlideAndEmit(prevSlide);
    } else if (this.props.currentSlide.positionInDeck !== this.props.slides.length && dir === 'next') {
      const nextSlide = this.props.slides[this.props.currentSlide.positionInDeck];
      this.props.setSlideAndEmit(nextSlide);
    } else {
      this.props.history.push(`/decks/${this.props.deck.id}`);
    }
  }
  handlePresenter() {
    this.setState({ showNotes: !this.state.showNotes });
  }

  render() {
    const { currentSlide, deck, slides } = this.props;
    const { showNotes } = this.state;

    return (
      <DocumentTitle
        title={deck && deck.id && currentSlide && currentSlide.id
          ? `Remote: ${deck.deckTitle}: Slide ${currentSlide.positionInDeck} | SlyDv` || 'Slideshow | SlyDv'
          : 'SlyDv'}
      >
        {currentSlide && slides && slides.length && deck &&
          <div className="remote-container">
            <h1>{deck.deckTitle}</h1>
            <h2>{`Slide ${currentSlide.positionInDeck} of ${slides.length}`}</h2>
            <section className="remote-button-container">
              <button className="dqpl-button-primary" type="button" onClick={() => this.handleClick('prev')}>
              &lt;{ currentSlide.positionInDeck === 1 ? 'END' : 'PREV'}
              </button>
              <button className="dqpl-button-primary" type="button" onClick={() => this.handleClick('next')}>
                { currentSlide.positionInDeck === slides.length ? 'END' : 'NEXT'}&gt;
              </button>
            </section>
            <section className="remote-speaker-notes">
              <div className="show-notes-btn-container">
                <button className="dqpl-button-primary show-notes-btn" type="button" onClick={this.handlePresenter}>
                  {`${!showNotes ? 'View' : 'Hide'} Speaker Notes`}
                </button>
              </div>
              {showNotes && <MarkdownAside markdown={ currentSlide.presenterNotes } />}
            </section>
          </div>

        }
      </DocumentTitle>
    );
  }
}

/* -----CONNECT TO STORE AND PROPS----- */

const mapState = (state, ownProps) => ({
  slides: state.deck.slides,
  currentSlide: state.slide.singleSlide,
  deck: state.deck,
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

export default connect(mapState, mapDispatch)(RemoteControl);

/* -----PROP TYPES AND DEFAULT----- */

RemoteControl.propTypes = {
  currentSlide: PropTypes.shape().isRequired,
  deck: PropTypes.shape({
    id: PropTypes.number.isRequired,
    footerText: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape().isRequired,
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

RemoteControl.defaultProps = {
  deck: {
    footerText: '',
  },
  slides: [],
};
