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
  Runkit,
  Signup,
  SlideView,
  SlideView1,
  SlideView2,
  SlideView3,
  SlideView4,
  SlideView5,
  UserDeckList,
  UserHome,
  NewDeckForm
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
            <Route path= "/new-deck" component={NewDeckForm} />
            <Route path="/makeslide" component={AddReplSlide} />
            <Route path='/:userId/decks' component={UserDeckList}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/runkit" component={Runkit} />
            {/* TMP ROUTES FOR CLICKTHROUGH */}
            <Route path="/slideview" component={SlideView} />
            <Route path="/slideview1" component={SlideView1} />
            <Route path="/slideview2" component={SlideView2} />
            <Route path="/slideview3" component={SlideView3} />
            <Route path="/slideview4" component={SlideView4} />
            <Route path="/slideview5" component={SlideView5} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
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
