import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchDeck, fetchSlideList, getSingleSlide, createSlide } from '../store';

class DeckOverview extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.newSlideClick = this.newSlideClick.bind(this);
  }

  componentDidMount() {
    const deckId = +this.props.match.params.deckId;
    const { slides } = this.props.deck;
    this.props.loadDeck(deckId);
    if (this.props.deck && slides && slides.length &&
        (slides[0].deckId !== this.props.currentSlide.deckId)) {
      this.props.setSlide(slides[0]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deck && nextProps.deck.slides && nextProps.deck.slides.length) {
      this.props.setSlide(nextProps.deck.slides[0]);
    }
  }

  handleClick(slide) {
    this.props.setSlide(slide);
  }

  newSlideClick() {
    const position = this.props.deck.slides.length + 1;
    const deckId = this.props.deck.id;
    const newSlide = {
      codeText: '',
      deckId,
      firstText: '',
      positionInDeck: position,
      presenterNotes: '',
      secondText: '',
      template: 'single-pane',
      title: '',
    };
    this.props.sendSlide(newSlide);
  }

  /* Need to add in slide number and ability to change where it is in the queue
  https://pattern-library.dequelabs.com/components/option-menus
  ^ May be useful for option dropdowns */

  render() {
    const { deck } = this.props;
    const { slides } = deck;
    return (
      <DocumentTitle title="Deck Overview | SlyDv">
        { deck.id
          ? (
            <div className="deck-overview">
              <h1>
                {deck.deckTitle}
                <Link className="present-link" to={`/decks/${deck.id}/live`}>PRESENT THIS DECK</Link>
                <Link to={`/decks/${deck.id}/live`} target="_blank">
                  <span className="glyphicon glyphicon-new-window" />
                </Link>
                <Link className="present-link" to={`/decks/${deck.id}/presenter`}>OPEN PRESENTER VIEW</Link>
                <Link to={`/decks/${deck.id}/presenter`} target="_blank">
                  <span className="glyphicon glyphicon-new-window" />
                </Link>
              </h1>
              <hr />
              { deck && slides && slides.length
                ? slides.map(slide => (
                  <div key={slide.id} className="deckview-slide-container">
                    <h2>
                      { `${slide.title} ` }
                      <Link to={`/editslide/${slide.id}`}>
                        <button
                          className="dqpl-button-primary"
                          type="button"
                          onClick={() => this.handleClick(slide)}
                        >
                            Edit
                        </button>
                      </Link>
                    </h2>
                  </div>
                ))
                : (<h2>This deck has no slides.</h2>)

              }
              <button className="dqpl-button-primary" type="button" onClick={this.newSlideClick}>ADD A SLIDE</button>
            </div>
          )
          : (
            <h1>Deck not found</h1>
          )
        }
      </DocumentTitle>
    );
  }
}

const mapState = state => ({
  deck: state.deck,
  slides: state.slide.slideList,
  currentSlide: state.slide.singleSlide,
});

const mapDispatch = (dispatch, ownProps) => ({
  loadDeck(deckId) {
    dispatch(fetchDeck(deckId));
  },
  loadSlides(deckId) {
    dispatch(fetchSlideList(deckId));
  },
  setSlide(slide) {
    dispatch(getSingleSlide(slide));
  },
  sendSlide(slide) { return dispatch(createSlide(slide, ownProps.history)); },
});

export default withRouter(connect(mapState, mapDispatch)(DeckOverview));

/* -------------- PROP TYPES -------------- */

DeckOverview.propTypes = {
  currentSlide: PropTypes.shape({
    deckId: PropTypes.number,
  }).isRequired,
  deck: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slides: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  loadDeck: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      deckId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  sendSlide: PropTypes.func.isRequired,
  setSlide: PropTypes.func.isRequired,
};

DeckOverview.defaultProps = {
  currentSlide: {
    deckId: null,
  },
  deck: {
    slides: [],
  },
};

