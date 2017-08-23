import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeDeck, fetchDeck } from '../store';
import DumbDeckForm from './DumbDeckForm';

class EditDeckForm extends Component {
  static propTypes = {
    deck: PropTypes.shape({
      deckTitle: PropTypes.string.isRequired,
      footerText: PropTypes.string,
      hasFooter: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
      theme: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      viewable: PropTypes.bool.isRequired,
    }).isRequired,
    loadDeck: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        deckId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    saved: PropTypes.bool,
    updateDeck: PropTypes.func.isRequired,
  };

  static defaultProps = {
    deck: {
      footerText: '',
    },
    saved: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      saved: props.saved,
      deck: {
        deckTitle: props.deck.deckTitle,
        footerText: props.deck.footerText,
        hasFooter: props.deck.hasFooter,
        theme: props.deck.theme,
        viewable: props.deck.viewable,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToastClick = this.handleToastClick.bind(this);
  }

  componentDidMount() {
    this.props.loadDeck(this.props.match.params.deckId)
      .then((getDeckAction) => {
        this.setState(Object.assign({}, this.state,
          { deck: getDeckAction.deck }));
      });
  }

  handleChange(e) {
    this.setState({
      deck: Object.assign({}, this.state.deck, { [e.target.name]: e.target.value }),
    });
  }

  handleRadioChange(e) {
    // console.log(`e.target.name: ${e.target.name}`);
    // console.log(`e.target.value: ${e.target.value} (${typeof e.target.value})`);
    let value = e.target.value;
    value = (value === 'true');
    // console.log(`value: ${value} (${typeof value})`);
    this.setState({
      deck: Object.assign({}, this.state.deck, { [e.target.name]: value }),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateDeck(this.state.deck.userId, this.state.deck)
      .then(() => this.setState({ saved: true }));
  }

  handleToastClick() {
    this.setState({ saved: false });
  }

  render() {
    // console.log('this.props:', this.props);
    // console.log('this.state:', this.state);
    return (
      <DocumentTitle title="Edit Deck | SlyDv">
        <div className="edit-deck-form">
          {/* was the form saved? ------------------------------------*/}
          { this.state.saved ? (
            <div className="dqpl-toast dqpl-toast-success">
              <div className="dqpl-toast-message">
                <div className="fa fa-info-circle" aria-hidden="true" /><span>Changes saved.</span>
              </div>
              <button className="dqpl-toast-dismiss fa fa-close" type="button" aria-label="Dismiss notification" onClick={this.handleToastClick} />
            </div>
          ) : null
          }

          { this.state.deck && (<DumbDeckForm
            deck={this.state.deck}
            handleChange={this.handleChange}
            handleRadioChange={this.handleRadioChange}
            handleSubmit={this.handleSubmit}
            submitLabel="Save Deck"
          />)}
        </div>
      </DocumentTitle>
    );
  }
}

const mapState = state => ({
  deck: state.deck,
});

const mapDispatch = dispatch => ({
  loadDeck(deckId) { return dispatch(fetchDeck(deckId)); },
  updateDeck(userId, deckObject) { return dispatch(changeDeck(userId, deckObject)); },
});

export default withRouter(connect(mapState, mapDispatch)(EditDeckForm));
