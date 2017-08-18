import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSlide, fetchSlideList } from '../store';
import history from '../history';

// things we need -- what deck, decklength

class NewSlideButton extends Component {
  static propTypes = {
    deck: PropTypes.shape(),
    // deckPosition: PropTypes.number,
    loadSlides: PropTypes.func.isRequired,
    sendSlide: PropTypes.func.isRequired,
    blankSlide: PropTypes.shape({
      title: PropTypes.string,
      firstText: PropTypes.string,
      secondText: PropTypes.string,
      template: PropTypes.string,
      codeText: PropTypes.string,
      presenterNotes: PropTypes.string,
    }),
  };

  static defaultProps = {
    deck: {},
    blankSlide: {
      title: '',
      firstText: '',
      secondText: '',
      template: 'single-pane',
      codeText: '',
      presenterNotes: '',
    },
    // deckPosition: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      deck: this.props.deck,
      blankSlide: {
        title: '',
        firstText: '',
        secondText: '',
        template: 'single-pane',
        codeText: '',
        presenterNotes: '',
      },
      // deckPosition: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.loadSlides(this.state.deck.id);
    .then((slides) => {
      this.state.blankSlide.positionInDeck = slides.length;
    });
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps: this.props:', this.props);
    console.log('this.state:', this.state);
  }

  handleClick() {
    console.log('inside handleClick!');
    this.props.sendSlide()
      .then((slide) => {
        console.log('slide:', slide);
        console.log('history before push:', history);
        history.push(`/${slide.id}`);
        console.log('history after push:', history);
      });
  }

  render() {
    return (
      <button className="dqpl-button-primary new-slide" type="button" onClick={this.handleClick}>New Slide</button>
    );
  }
}

const mapState = state => ({
  deck: state.deck,
});

const mapDispatch = dispatch => ({
  sendSlide() { return dispatch(createSlide()); },
  loadSlides(deckId) { return dispatch(fetchSlideList(deckId)); },
});

export default withRouter(connect(mapState, mapDispatch)(NewSlideButton));
