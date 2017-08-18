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
    deckId: PropTypes.number,
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
    slides: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    deck: {},
    deckId: null,
    blankSlide: {
      title: '',
      firstText: '',
      secondText: '',
      template: 'single-pane',
      codeText: '',
      presenterNotes: '',
    },
    slides: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      deck: this.props.deck,
      deckId: this.props.deckId,
      blankSlide: {
        deckId: this.props.deckId,
        title: '',
        firstText: '',
        secondText: '',
        template: 'single-pane',
        codeText: '',
        presenterNotes: '',
      },
      slides: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('NewSlideButton: componentDidMount: this.props.deckId:', this.props.deckId);
    this.props.loadSlides(this.props.deckId)
      .then((slides) => {
        console.log('NewSlideButton: componentDidMount: slides:', slides);
        this.setState({ slides });
      });
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log('NewSlideButton: nextProps:', nextProps);
    console.log('NewSlideButton: nextState:', nextState);
    if (nextProps.deckId !== this.props.deckId) {
      this.setState({ deckId: nextProps.deckId });
    }
    // console.log('NewSlideButton: componentWillReceiveProps: this.props:', this.props);
    console.log('NewSlideButton: componentWillReceiveProps: this.state:', this.state);

    this.state.blankSlide.positionInDeck = this.state.slides.slideList.length;
    this.setState(this.state);
  }

  handleClick() {
    console.log('NewSlideButton: inside handleClick: this.props:', this.props);
    this.props.sendSlide(this.props.blankSlide)
      .then((slide) => {
        console.log('NewSlideButton: handleClick: slide:', slide);
        console.log('NewSlideButton: handleClick: history before push:', history);
        history.push(`/${slide.id}`);
        console.log('NewSlideButton: handleClick: history after push:', history);
      });
  }

  render() {
    console.log('NewSlideButton: this.props:', this.props);
    return (
      <button className="dqpl-button-primary new-slide" type="button" onClick={this.handleClick}>New Slide</button>
    );
  }
}

const mapState = state => ({
  deck: state.deck,
});

const mapDispatch = dispatch => ({
  sendSlide(slide) { return dispatch(createSlide(slide)); },
  loadSlides(deckId) { return dispatch(fetchSlideList(deckId)); },
});

export default withRouter(connect(mapState, mapDispatch)(NewSlideButton));
