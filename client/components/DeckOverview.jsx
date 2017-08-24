import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchDeck, fetchSlideList, getSingleSlide, createSlide, deleteSlide, deleteChatLog } from '../store';

class DeckOverview extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.newSlideClick = this.newSlideClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClearChats = this.handleClearChats.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.state = {
      chatsCleared: false
    }
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

  handleClearChats(){
    this.props.clearChats(this.props.deck.id)
    .then( this.setState({ chatsCleared : true }));
  }

  handleDismiss(){
    this.setState({ chatsCleared : false });
  }


  

  /* Need to add in slide number and ability to change where it is in the queue
  https://pattern-library.dequelabs.com/components/option-menus
  ^ May be useful for option dropdowns */

  render() {
    const { deck } = this.props;
    const { slides } = deck;

    const chatDeleteToast = (
      <div className="dqpl-toast dqpl-toast-success">
       <div className="dqpl-toast-message">
        <div className="fa fa-info-circle" aria-hidden="true" /><span>Chat Log Cleared</span>
        </div>
          <button className="dqpl-toast-dismiss fa fa-close" type="button" aria-label="Dismiss notification" onClick={this.handleDismiss}/>
        </div>
      )
    return (
      <DocumentTitle title="Deck Overview | SlyDv">
        { deck.id
          ? (
            <div className="deck-overview">
            { this.state.chatsCleared && chatDeleteToast }
              <h1>
                {deck.deckTitle}
                <Link className="present-link" to={`/decks/${this.props.deck.id}/edit`}>Edit Deck</Link>
                <Link className="present-link" to={`/decks/${deck.id}/static`}>View Slides</Link>
                <Link className="present-link" to={`/decks/${deck.id}/presenter`}>Presenter View</Link>
              </h1>
              <hr />
              { deck && slides && slides.length
                ? (
                  <table>
                    <tbody>
                      {slides.map(slide => (
                        <tr key={slide.id} className="deckview-slide-container">
                          <td>{ `${slide.title} ` }</td>
                          <td>
                            <Link to={`/decks/${deck.id}/live`}>
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
               <button className="dqpl-button-secondary" type="button" onClick={this.handleClearChats}> Clear ChatLog </button>
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


