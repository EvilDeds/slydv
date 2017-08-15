import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserDeckList } from '../store';

class UserDeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('component did mount props: ', this.props);
    this.props.loadDecks(this.props.user.id);
  }

  render() {
    const decks = this.props.deckList;
    return (
      <div className="UserDeckList col-lg-9 offset-lg-3">
        <h3>Check out your decks!</h3>
        <hr />
        { decks.length ? (
          <div className="row">
            {decks.map(deck => (
              <figure className="col-xs-4" key={deck.id}>
                <Link to={`/users/decks/${deck.id}`} >
                  {deck.deckTitle}
                </Link>
              </figure>
            ))}
          </div>
        ) : (
          <p>You have no decks yet!</p>
        )}
        <button>
          Make a New Deck!
        </button>
      </div>
    );
  }
}

const mapState = state => ({
  deckList: state.userDeckList,
  user: state.user,
});

const mapDispatch = dispatch => ({
  loadDecks(userId) { dispatch(fetchUserDeckList(userId)); },
});

export default connect(mapState, mapDispatch)(UserDeckList);

