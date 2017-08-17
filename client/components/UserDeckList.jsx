import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserDeckList } from '../store';

class UserDeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.props.loadDecks(this.props.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user && nextProps.user.id !== this.props.user.id){
      this.props.loadDecks(nextProps.user.id);
    }
  }

  render() {
    const decks = this.props.deckList;
    return (
      <div className="UserDeckList col-lg-9 offset-lg-3">
        <h3>Check out your decks!</h3>
        <hr />
        { decks.length ? (
          <ul>
            {decks.map(deck => (
              <li key={deck.id}>
                <Link to={`/users/decks/${deck.id}`} >
                  {deck.deckTitle}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no decks yet!</p>
        )}
        <hr/>
        <Link to="/new-deck">
          Make a New Deck!
        </Link>
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

