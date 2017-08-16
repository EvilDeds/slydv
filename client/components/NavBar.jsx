import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = (props) => {
  const { handleClick, isLoggedIn } = props;

    return (
      <div className="Navbar"> 
        <h1>S L Y D V</h1>
        <nav>
         {
          isLoggedIn
            ? <div className="isLoggedIn">
              {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <Link to={`/users/${props.user.id}/decks`}>My Decks</Link>
                <Link to="/new-deck">Make a Deck</Link>
                <a href="#" onClick={handleClick}>Logout</a>
              </div>
              : <div className="isLoggedOut">
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
          }
        </nav> 
      </div>

  		)
  

}

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Navbar));

/* -------------- PROP TYPES -------------- */

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
