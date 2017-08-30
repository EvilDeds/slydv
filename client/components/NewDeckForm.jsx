import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DumbDeckForm from './DumbDeckForm';
import { createSlide, postNewDeck } from '../store';

/* -------------- COMPONENT -------------- */

class NewDeckForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDeck: {
        deckTitle: '',
        footerText: '',
        hasFooter: false,
        theme: 'red',
        viewable: false,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      newDeck: Object.assign({}, this.state.newDeck, { [e.target.name]: e.target.value }),
    });
  }

  handleRadioChange(e) {
    let value = e.target.value;
    value = (value === 'true');
    this.setState({
      newDeck: Object.assign({}, this.state.newDeck, { [e.target.name]: value }),
    });
  }

  handleSubmit() {
    this.props.sendDeck(Number(this.props.user.id), this.state.newDeck)
      .then((action) => {
        const firstSlide = {
          deckId: action.deck.id,
          title: '',
          firstText: '',
          secondText: '',
          template: 'single-pane',
          codeText: '',
          positionInDeck: 1,
          presenterNotes: '',
        };
        this.props.sendSlide(firstSlide);
      });
  }

  render() {
    return (
      <DocumentTitle title="Make a Deck | SlyDv">
        <div className="new-deck-form">
          <p><i>Is there anything more beautiful than a fresh deck?</i></p>
          { this.state.newDeck && (<DumbDeckForm
            deck={this.state.newDeck}
            handleChange={this.handleChange}
            handleRadioChange={this.handleRadioChange}
            handleSubmit={this.handleSubmit}
            submitLabel="Save & Start Your Deck"
          />)}
        </div>
      </DocumentTitle>
    );
  }
}

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  user: state.user,
  deck: state.deck,
});

const mapDispatch = (dispatch, ownProps) => ({
  sendDeck(userId, deck) { return dispatch(postNewDeck(userId, deck)); },
  sendSlide(slide) { return dispatch(createSlide(slide, ownProps.history)); },
});

export default withRouter(connect(mapState, mapDispatch)(NewDeckForm));

/* -------------- PROP TYPES -------------- */

NewDeckForm.propTypes = {
  sendDeck: PropTypes.func.isRequired,
  sendSlide: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
}

NewDeckForm.defaultProps = {
  user: {
    id: null,
  },
};
