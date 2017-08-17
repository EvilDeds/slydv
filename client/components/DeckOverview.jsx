import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDeck, fetchSlideList } from '../store';

class DeckOverview extends Component {
  componentDidMount() {
    const deckId = +this.props.match.params.deckId;
    this.props.loadDeck(deckId);
    this.props.loadSlides(deckId);
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
                    <h2>{ slide.title }</h2>
                    {/* FIX LINK WHEN WE HAVE EDIT PAGE */}
                    <Link to={''}>Edit Slide</Link>
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
}

const mapState = state => ({
  deck: state.deck,
  slides: state.slide.slideList,
});

const mapDispatch = dispatch => ({
  loadDeck(deckId) {
    dispatch(fetchDeck(deckId));
  },
  loadSlides(deckId) {
    dispatch(fetchSlideList(deckId));
  },
});

export default connect(mapState, mapDispatch)(DeckOverview);
