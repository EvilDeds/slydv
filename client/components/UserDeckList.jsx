import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserDeckList, destroyDeck } from '../store';

class UserDeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.loadDecks(this.props.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.id !== this.props.user.id) {
      this.props.loadDecks(nextProps.user.id);
    }
    if (nextProps.deckList && nextProps.deckList.length !== this.props.deckList.length){
      this.props.loadDecks(nextProps.user.id);
    }
  }
  
  handleDelete(e){
     this.props.dumpDeck(e.target.value)
  }

  render() {
    const decks = this.props.deckList;
    const userEmail = this.props.user.email;
    return (
      <DocumentTitle title="My Decks | SlyDv">
        <div className="user-deck-list">
          <h3>Welcome, {userEmail}! Check out your decks!</h3>
          <hr />
          { decks.length ? (
            <table>
              <tbody>
                {decks.map(deck => (
                  <tr key={deck.id}>
                    <td>
                      <Link to={`/decks/${deck.id}`} >
                        {deck.deckTitle}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/decks/${deck.id}`}>
                        <button
                          className="dqpl-button-secondary"
                          type="button"
                        >
                            View Slide List
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/decks/${deck.id}/edit`}>
                        <button
                          className="dqpl-button-secondary"
                          type="button"
                        >
                            Edit Deck Properties
                        </button>
                      </Link>
                    </td>
                    <td>
                    <button
                     className="dqpl-button-secondary"
                     type="button"
                     onClick={this.handleDelete}
                     value={deck.id}
                        >
                        Delete Deck
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>You have no decks yet!</p>
          )}
          <hr />
          <Link to="/new-deck">
            <button
              className="dqpl-button-primary"
              type="button"
            >
                Make a New Deck!
            </button>
          </Link>
        </div>
      </DocumentTitle>
    );
  }
}

const mapState = state => ({
  deckList: state.userDeckList,
  user: state.user,
});

const mapDispatch = dispatch => ({
  loadDecks(userId) { 
    dispatch(fetchUserDeckList(userId)); 
  },
  dumpDeck(deckId) {
    return dispatch(destroyDeck(deckId));
  }
});

export default connect(mapState, mapDispatch)(UserDeckList);


/* -------------- PROP TYPES -------------- */

UserDeckList.propTypes = {
  deckList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loadDecks: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

// UserDeckList.defaultProps = {};
