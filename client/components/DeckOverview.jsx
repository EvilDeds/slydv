import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  createSlide,
  deleteChatLog,
  deleteSlide,
  fetchDeck,
  fetchSlideList,
  getSingleSlide,
} from '../store';

/* -------------- COMPONENT -------------- */

class DeckOverview extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.newSlideClick = this.newSlideClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClearChats = this.handleClearChats.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.state = {
      chatsCleared: false,
    };
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

  handleClearChats() {
    this.props.clearChats(this.props.deck.id)
      .then(this.setState({ chatsCleared: true }));
  }

  handleClick(slide) {
    this.props.setSlide(slide);
  }

  handleClickDelete(slide) {
    this.props.deleteSlide(slide.id);
    // reload the deck to change state and redraw
    const deckId = +this.props.match.params.deckId;
    const { slides } = this.props.deck;
    this.props.loadDeck(deckId);
    if (this.props.deck && slides && slides.length &&
      (slides[0].deckId !== this.props.currentSlide.deckId)) {
      this.props.setSlide(slides[0]);
    }
  }

  handleDismiss() {
    this.setState({ chatsCleared: false });
  }

  /* Need to add in slide number and ability to change where it is in the queue
  https://pattern-library.dequelabs.com/components/option-menus
  ^ May be useful for option dropdowns */

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

  render() {
    const { deck } = this.props;
    const { slides } = deck;

    const chatDeleteToast = (
      <div className="dqpl-toast dqpl-toast-success">
        <div className="dqpl-toast-message">
          <div className="fa fa-info-circle" aria-hidden="true" /><span>Chat Log Cleared</span>
        </div>
        <button className="dqpl-toast-dismiss fa fa-close" type="button" aria-label="Dismiss notification" onClick={this.handleDismiss} />
      </div>
    );

    return (
      <DocumentTitle title="Deck Overview | SlyDv">
        { deck.id
          ? (
            <div className="deck-overview">
              { this.state.chatsCleared && chatDeleteToast }
              <h1>
                {deck.deckTitle}
              </h1>
              <ul className="deck-options">
                <li><Link to={`/decks/${this.props.deck.id}/edit`}><div className="fa fa-gear" /> Edit Deck</Link></li>
                <li><Link to={`/decks/${deck.id}/static`}><div className="fa fa-eye" /> Preview Slides</Link></li>
                <li><Link to={`/decks/${deck.id}/presenter`}><div className="fa fa-play" /> Open Presenter View</Link></li>
                <li><Link to={`/decks/${deck.id}/chats`}><div className="fa fa-comments" /> View Chat Log</Link></li>
                <li><Link to={`/decks/${deck.id}`} onClick={this.handleClearChats}><div className="fa fa-remove" /> Clear Chat Log</Link></li>
              </ul>
              <hr />
              { deck && slides && slides.length
                ? (
                  <table>
                    <tbody>
                      {slides.map(slide => (
                        <tr key={slide.id} className="deckview-slide-container">
                          <td>{`${slide.title}`}</td>
                          <td>
                            <Link to={`/decks/${deck.id}/static`}>
                              <button
                                className="dqpl-button-secondary"
                                type="button"
                                onClick={() => this.handleClick(slide)}
                              >
                                  View
                              </button>
                            </Link>
                          </td>
                          <td>
                            <Link to={`/editslide/${slide.id}`}>
                              <button
                                className="dqpl-button-secondary"
                                type="button"
                                onClick={() => this.handleClick(slide)}
                              >
                                  Edit
                              </button>
                            </Link>
                          </td>
                          <td>
                            <button
                              className="dqpl-button-secondary"
                              type="button"
                              onClick={() => this.handleClickDelete(slide)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
                : (<h2>This deck has no slides.</h2>)
              }
              <hr />
              <button className="dqpl-button-primary" type="button" onClick={this.newSlideClick}>Add a Slide</button>
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

/* -------------- CONTAINER -------------- */

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
  deleteSlide(slide) {
    dispatch(deleteSlide(slide));
  },
  sendSlide(slide) {
    return dispatch(createSlide(slide, ownProps.history));
  },
  clearChats(deckId) {
    return dispatch(deleteChatLog(deckId));
  },
});

export default withRouter(connect(mapState, mapDispatch)(DeckOverview));

/* -------------- PROP TYPES -------------- */

DeckOverview.propTypes = {
  clearChats: PropTypes.func.isRequired,
  currentSlide: PropTypes.shape({
    deckId: PropTypes.number,
  }).isRequired,
  deck: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slides: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  deleteSlide: PropTypes.func.isRequired,
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
