import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserDeckList } from '../store';

class UserDeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadDecks(this.props.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.id !== this.props.user.id) {
      this.props.loadDecks(nextProps.user.id);
    }
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
  loadDecks(userId) { dispatch(fetchUserDeckList(userId)); },
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
