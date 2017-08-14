import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';

import { AddReplSlide } from './components/ReplSlideFormHO';
import { Main, Login, Signup, UserHome, Runkit } from './components';
import { SlideSample, SlideSample1, SlideSample2, SlideSample3, SlideSample4, SlideSample5 } from './components';
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
            <Route path="/makeslide" component={AddReplSlide} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/runkit" component={Runkit} />
              {/*TMP ROUTES FOR CLICKTHROUGH*/}
            <Route path='/slidesample' component={SlideSample} />
            <Route path='/slidesample1' component={SlideSample1} />
            <Route path='/slidesample2' component={SlideSample2} />
            <Route path='/slidesample3' component={SlideSample3} />
            <Route path='/slidesample4' component={SlideSample4} />
            <Route path='/slidesample5' component={SlideSample5} />
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
