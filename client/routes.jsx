import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import {
  ChatBox,
  DeckOverview,
  EditDeckForm,
  EditSlideForm,
  Landing,
  Login,
  Main,
  NewDeckForm,
  RemoteControl,
  Runkit,
  Signup,
  SlideViewFrame,
  SlideViewLive,
  UserDeckList,
  UserHome,
} from './components';
import history from './history';
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
            <Route exact path="/decks/:deckId/chats" component={ChatBox} />
            <Route exact path="/decks/:deckId/remote" component={RemoteControl} />
            <Route exact path="/decks/:deckId" component={DeckOverview} />
            <Route exact path="/decks/:deckId/edit" component={EditDeckForm} />
            <Route exact path="/decks/:deckId/:viewTypeParam" component={SlideViewLive} />
            <Route path="/editslide/:slideId" component={EditSlideForm} />
            <Route path="/login" component={Login} />
            <Route path="/new-deck" component={NewDeckForm} />
            <Route path="/runkit" component={Runkit} />
            <Route path="/signup" component={Signup} />
            <Route path="/slideview" component={SlideViewFrame} />
            <Route exact path="/users/:userId/decks" component={UserDeckList} />

            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Landing} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having
  // a state.user that has a truthy id. Otherwise, state.user will
  // be an empty object, and state.user.id will be falsey.
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
