import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDeck, fetchSlideList } from '../store';
import { Link } from 'react-router-dom';

class DeckOverview extends Component {
  componentDidMount(nextProps) {
    const deckId = +this.props.match.params.deckId
    this.props.loadDeck(deckId);
    this.props.loadSlides(deckId);
  }

  render() {
    const { deck, slides } = this.props;
    return (
      <div>
      { slides[0] && deck.id
        ? (
            <div>
              <h1>{ deck.deckTitle } </h1>
              <hr />
              {slides.map(slide => (
                <div key={slide.id} className="deckview-slide-container">
                  <h2>{ slide.title }</h2>
                  {/*FIX LINK WHEN WE HAVE EDIT PAGE*/}
                  <Link to={``}>Edit Slide</Link>
                </div>
              ))}
            </div>
          )
        : (
          <h1>Deck not found</h1>
          )
      }
      </div>
    )
  };
}

const mapState = state => ({
  deck: state.deck,
  slides: state.slide.slideList
})

const mapDispatch = dispatch => ({
  loadDeck(deckId) {
    dispatch(fetchDeck(deckId));
  },
  loadSlides(deckId){
    dispatch(fetchSlideList(deckId));
  }
})

export default connect(mapState, mapDispatch)(DeckOverview)
