import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { postNewDeck, createSlide } from '../store';

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
        chats: '',
        deckTitle: '',
        hasFooter: false,
        theme: 'red',
        viewable: false,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      newDeck: Object.assign({}, this.state.newDeck, { [e.target.name]: e.target.value }),
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
          <form className="form-horizontal">

            {/* deck title --------------------------------------------*/}
            <div className="dqpl-field-wrap">
              <label className="control-label" htmlFor="deckTitle" id="deckTitleLabel">Deck Title</label>
              <input className="dqpl-text-input" type="text" name="deckTitle" aria-labelledby="deckTitleLabel" value={this.state.newDeck.deckTitle} onChange={this.handleChange} />
            </div>

            {/* deck theme --------------------------------------------*/}
            <div className="dqpl-field-wrap">
              <label htmlFor="theme" id="themeLabel">Choose a Deck Theme</label>
              <div className="dqpl-select">
                <select name="theme" aria-labelledby="themeLabel" value={this.state.newDeck.theme} onChange={this.handleChange}>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                </select>
              </div>
            </div>

            {/* deck has a footer? ------------------------------------*/}
            <div className="actual-radio-group" role="radiogroup" aria-labelledby="hasFooterLabel" onChange={this.handleChange}>
              <label className="control-label" id="hasFooterLabel" htmlFor="hasFooter">Should this deck have a footer?</label>
              <input type="radio" aria-labelledby="hasFooterLabel" name="hasFooter" value="true" /><span className="radio-label-inline">Yes</span>
              <input type="radio" aria-labelledby="hasFooterLabel" name="hasFooter" value="false" /><span className="radio-label-inline">No</span>
            </div>

            {/* deck is viewable? -------------------------------------*/}
            <div className="actual-radio-group" role="radiogroup" aria-labelledby="hasFooterLabel" onChange={this.handleChange}>
              <label className="control-label" id="viewableLabel" htmlFor="viewable">Should this deck be publicly viewable?</label>
              <input type="radio" aria-labelledby="viewableLabel" name="viewable" value="true" /><span className="radio-label-inline">Yes</span>
              <input type="radio" aria-labelledby="viewableLabel" name="viewable" value="false" /><span className="radio-label-inline">No</span>
            </div>

            {/* save deck and edit the first slide --------------------*/}
            <button className="dqpl-button-primary" type="button" onClick={this.handleSubmit}>Save & Start Your Deck</button>
          </form>
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
