import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
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

  /* Need to add in slide number and ability to change where it is in the queue
  https://pattern-library.dequelabs.com/components/option-menus
  ^ May be useful for option dropdowns */

  render() {
    const { deck } = this.props;
    const { slides } = deck;
    return (
      <div>
        { deck.id
          ? (
            <div>
              <h1>
                { `${deck.deckTitle} | ` }
                <Link to={`/decks/${deck.id}/live`}>START SLIDESHOW</Link>
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
      </div>
    );
  }

  handleClick(slide) {
    this.props.setSlide(slide);
  }
  newSlideClick(slide){
    const position = this.props.deck.slides.length + 1
    const deckId = this.props.deck.id
    const newSlide = {
      deckId: deckId, 
      title: '',
      firstText: '',
      secondText: '',
      template: 'single-pane',
      codeText: '',
      positionInDeck: position,
      presenterNotes: ''
    }
    this.props.sendSlide(newSlide)
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
  sendSlide(slide){ return dispatch(createSlide(slide, ownProps.history))}
});

export default withRouter(connect(mapState, mapDispatch)(DeckOverview));
