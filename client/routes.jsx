import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';

import { AddReplSlide } from './components/ReplSlideFormHO';
import {
  Login,
  Main,
  NewDeckForm,
  Runkit,
  Signup,
  SlideViewFrame,
  UserDeckList,
  UserHome,
  Landing,
  Landing2,
} from './components';
import { me } from './store';

/* -------------- COMPONENT -------------- */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/makeslide" component={AddReplSlide} />
            <Route path="/new-deck" component={NewDeckForm} />
            <Route path="/runkit" component={Runkit} />
            <Route path="/signup" component={Signup} />
            <Route path="/slideview" component={SlideViewFrame} />
            <Route path="/users/:userId/decks" component={UserDeckList}/>

            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Landing2} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user
  // that has a truthy id. Otherwise, state.user will be an empty object, and
  // state.user.id will be falsey.
  isLoggedIn: !!state.user.id,
});


const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
  },
});

export default connect(mapState, mapDispatch)(Routes);

/* -------------- PROP TYPES -------------- */

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
