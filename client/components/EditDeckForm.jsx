import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeDeck, fetchDeck } from '../store';
import DumbDeckForm from './DumbDeckForm';

/* -------------- COMPONENT -------------- */

class EditDeckForm extends Component {
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
    let value = e.target.value;
    value = (value === 'true');
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
    return (
      <DocumentTitle title="Edit Deck | SlyDv">
        <div className="edit-deck-form">
          <h1>Edit Deck</h1>

          <p className="instructions"><em>All text fields on this form accept <a href="https://guides.github.com/features/mastering-markdown/">GitHub-flavored Markdown</a>.</em></p>

          {/* was the form saved? ------------------------------*/}
          { this.state.saved ? (
            <div className="dqpl-toast dqpl-toast-success">
              <div className="dqpl-toast-message">
                <div aria-hidden="true" className="fa fa-info-circle" /><span>Changes saved.</span>
              </div>
              <button aria-label="Dismiss notification" className="dqpl-toast-dismiss fa fa-close" onClick={this.handleToastClick} type="button" />
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

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  deck: state.deck,
});

const mapDispatch = dispatch => ({
  loadDeck(deckId) { return dispatch(fetchDeck(deckId)); },
  updateDeck(userId, deckObject) { return dispatch(changeDeck(userId, deckObject)); },
});

export default withRouter(connect(mapState, mapDispatch)(EditDeckForm));

/* -------------- PROP TYPES -------------- */

EditDeckForm.propTypes = {
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

EditDeckForm.defaultProps = {
  deck: {
    footerText: '',
  },
  saved: false,
};
