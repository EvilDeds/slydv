import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDeck, fetchSlideList, getSingleSlide } from '../store';

class DeckOverview extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const deckId = +this.props.match.params.deckId;
    this.props.loadDeck(deckId);
    this.props.loadSlides(deckId);
    if (this.props.slides.length &&
        (this.props.slides[0].deckId !== this.props.currentSlide.deckId)) {
        this.props.setSlide(this.props.slides[0]);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.slides !== this.props.slides
       || (nextProps.deck.id !== this.props.currentSlide.deckId)) {
      if (nextProps.slides.length) {
        this.props.setSlide(nextProps.slides[0]);
      }
    }
  }

  /* Need to add in slide number and ability to change where it is in the queue
  https://pattern-library.dequelabs.com/components/option-menus
  ^ May be useful for option dropdowns */

  render() {
    const { deck, slides } = this.props;
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
              { slides[0]
                ? slides.map(slide => (
                  <div key={slide.id} className="deckview-slide-container">
                    <h2>
                      { `${slide.title} ` }
                      <Link to={`/editslide/${slide.id}`}>
                        <button
                          className="dqpl-button-primary"
                          type="button"
                          onClick={evt => this.handleClick(evt, slide)}
                        >
                            Edit
                        </button>
                      </Link>
                    </h2>
                  </div>
                ))
                : (<h2>This deck has no slides.</h2>)

              }
              <button className="dqpl-button-primary" type="button">ADD A SLIDE</button>
            </div>
          )
          : (
            <h1>Deck not found</h1>
          )
        }
      </div>
    );
  }



  handleClick(evt, slide) {
    this.props.setSlide(slide);
  }
}

const mapState = state => ({
  deck: state.deck,
  slides: state.slide.slideList,
  currentSlide: state.slide.singleSlide,
});

const mapDispatch = dispatch => ({
  loadDeck(deckId) {
    dispatch(fetchDeck(deckId));
  },
  loadSlides(deckId) {
    dispatch(fetchSlideList(deckId));
  },
  setSlide(slide) {
    dispatch(getSingleSlide(slide));
  },
});

export default connect(mapState, mapDispatch)(DeckOverview);
