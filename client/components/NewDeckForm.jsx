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
        deckTitle: '',
        viewable: false,
        hasFooter: false,
        chats: '',
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
      <DocumentTitle className="new-deck-form" title="Make a Deck | SlyDv">
        <div>
          <p><i>Is there anything more beautiful than a fresh deck?</i></p>
          <form className="form-horizontal" onChange={this.handleChange}>
            <div className="form-group">
              <label className="control-label" htmlFor="deckTitle" id="deckTitleLabel">Deck Title</label>
              <textarea name="deckTitle" aria-labelledby="deckTitleLabel" />
            </div>
            <div className="form-group">
              <label htmlFor="chooseTheme" id="chooseThemeLabel">Choose a Deck Theme</label>
              <select name="chooseTheme" aria-labelledby="chooseThemeLabel">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </select>
            </div>
            <div className="form-group">
              <label className="control-label" id="hasFooterLabel" htmlFor="hasFooter">Do you Need a Footer?</label>
              <input type="radio" name="hasFooter" value="true" aria-labelledby="hasFooterLabel" />Yes
              <input type="radio" name="hasFooter" value="false" aria-labelledby="hasFooterLabel" />No
            </div>
            <div className="form-group">
              <label className="control-label" id="viewableLabel" htmlFor="viewable">Viewable:</label>
              <input type="radio" name="viewable" value="true" aria-labelledby="viewableLabel" />Yes
              <input type="radio" name="viewable" value="false" aria-labelledby="viewableLabel" />No
            </div>
            <button type="submit" onClick={this.handleSubmit}>Save & Start Your Deck</button>
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
