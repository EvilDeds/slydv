import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { logout } from '../store';

/* -------------- COMPONENT -------------- */

const Main = (props) => {
  const { children, handleClick, isLoggedIn, showNavBar } = props;

  return (
    <div className="main-div">
      { showNavBar && <NavBar /> }
      {children}
    </div>
  );
};

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  isLoggedIn: !!state.user.id,
  showNavBar: state.showNavBar,
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/* -------------- PROP TYPES -------------- */

Main.propTypes = {
  children: PropTypes.shape().isRequired,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
