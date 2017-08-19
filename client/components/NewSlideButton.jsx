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
        positionInDeck: this.props.positionInDeck,
      },
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.deckId !== this.props.deckId) {
      this.setState({ deckId: nextProps.deckId });
    }
  }

  handleClick() {
    console.log('NewSlideButton: inside handleClick: this.state.blankSlide:', this.state.blankSlide);
    this.props.sendSlide(this.state.blankSlide)
      .then((slide) => {
        console.log('NewSlideButton: handleClick: slide:', slide);
        console.log('NewSlideButton: handleClick: history before push:', history);
        history.push(`/editslide/${slide.singleSlide.id}`);
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
