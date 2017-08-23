import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postNewDeck, createSlide } from '../store';
import DumbDeckForm from './DumbDeckForm';

class NewDeckForm extends Component {
  static propTypes = {
    sendDeck: PropTypes.func.isRequired,
    sendSlide: PropTypes.func.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }

  static defaultProps = {
    user: {
      id: null,
    },
  };

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log("e:", e);
    // There's this weird issue where you can only change
    console.log(`e.target.value: ${e.target.value} (${typeof e.target.value})`);
    let value = e.target.value;
    if ((e.target.name === 'hasFooter' || e.target.name === 'viewable') && typeof value === 'string') {
      console.log(typeof value);
      value = (value === 'true');
    }
    console.log(`value: ${value} (${typeof value})`);
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
          { this.state.newDeck && (<DumbDeckForm
            deck={this.state.newDeck}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            submitLabel="Save & Start Your Deck"
          />)}
        </div>
      </DocumentTitle>
    );
  }
}

const mapState = state => ({
  user: state.user,
  deck: state.deck,
});

const mapDispatch = (dispatch, ownProps) => ({
  sendDeck(userId, deck) { return dispatch(postNewDeck(userId, deck)); },
  sendSlide(slide) { return dispatch(createSlide(slide, ownProps.history)); },
});

export default withRouter(connect(mapState, mapDispatch)(NewDeckForm));
