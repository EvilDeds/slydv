import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSlide, fetchSingleSlide } from '../store';

class EditSlideForm extends Component {
  static propTypes = {
    deckLength: PropTypes.number,
    singleSlide: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      firstText: PropTypes.string,
      secondText: PropTypes.string,
      template: PropTypes.string,
      codeText: PropTypes.string,
      positionInDeck: PropTypes.number,
      presenterNotes: PropTypes.string,
    }),
  };

  static defaultProps = {
    singleSlide: {
      id: null,
      title: '',
      firstText: '',
      secondText: '',
      // template: 'mid-page',
      // template: 'single-pane',
      // template: 'columns-header',
      // template: 'columns',
      template: '',
      codeText: '',
      positionInDeck: 1,
      presenterNotes: '',
    },
    deckLength: 1,
  };

  constructor(props) {
    super();
    this.state = {
      singleSlide: {
        codeText: props.singleSlide.codeText,
        id: props.singleSlide.id,
        positionInDeck: props.singleSlide.positionInDeck,
        presenterNotes: props.singleSlide.presenterNotes,
        template: props.singleSlide.template,
        firstText: props.singleSlide.firstText,
        secondText: props.singleSlide.secondText,
        title: props.singleSlide.title,
      },
      deckLength: props.deckLength,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadSlide(this.props.match.params.slideId)
    .then((newSingleSlideAction) => {
      this.setState(Object.assign({}, this.state, { singleSlide: newSingleSlideAction.singleSlide }));
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps:', nextProps);
    if (nextProps.singleSlide.id !== this.props.singleSlide.id) {
      this.props.loadSlide(nextProps.singleSlide.id)
      .then((newSingleSlideAction) => {
        console.log('newSingleSlideAction:', newSingleSlideAction);
        this.setState(Object.assign({}, this.state, { singleSlide: newSingleSlideAction.singleSlide }));
    });

    }
    // this.setState({ firstText: nextProps.singleSlide.firstText });
  }

  handleChange(evt) {
    this.state.singleSlide[evt.target.id] = evt.target.value;
    this.setState(this.state);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('handleSubmit: this.props.singleSlide.id:', this.props.singleSlide.id);
    console.log('handleSubmit: this.state.singleSlide:', this.state.singleSlide);
    this.props.updateSlide(this.props.singleSlide.id, this.state.singleSlide);
  }

  render() {
    console.log('this.props:', this.props);
    console.log('this.state:', this.state);
    return (
      <div className="EditSlideForm">
        {/* positionInDeck -----------------------------------------*/}
        <h2>Slide {this.state.singleSlide.positionInDeck} of {this.state.deckLength}</h2>
        <form
          onSubmit={this.state.handleSubmit}
          // onChange={this.state.handleChange}
        >
          {/* template -----------------------------------------------*/}
          <div className="dqpl-field-wrap">
            <div className="dqpl-label" id="template-label">Change slide template</div>
            <div className="dqpl-select">
              <select id="template" onChange={this.handleChange} aria-labelledby="template-label" value={this.state.singleSlide.template}>
                <option value="mid-page">single pane starting mid-page</option>
                <option value="single-pane">single pane</option>
                <option value="columns">2 columns</option>
                <option value="columns-header">header + 2 columns</option>
                <option value="repl">Header + REPL</option>
              </select>
            </div>
          </div>

          {/* title - conditional ------------------------------------*/}
          { this.state.singleSlide.template === 'columns-header' || this.state.singleSlide.template === 'repl' ? (
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="title" id="title-label">Title</label>
              <input className="dqpl-text-input" type="text" id="title" value={this.state.singleSlide.title} onChange={this.handleChange} aria-labelledby="title-label" />
            </div>
          ) : null }

          {/* firstText - conditional --------------------------------*/}
          { this.state.singleSlide.template !== 'repl' ? (
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="firstText" id="firstText-label">{ this.state.singleSlide.template === 'columns' || this.state.singleSlide.template === 'columns-header' ? 'Left column' : 'Text'}</label>
              <textarea className="dqpl-textarea" id="firstText" value={this.state.singleSlide.firstText} onChange={this.handleChange} aria-labelledby="firstText-label-label" />
            </div>
          ) : null }

          {/* secondText - conditional ------------------------------------*/}
          { this.state.singleSlide.template === 'columns' || this.state.singleSlide.template === 'columns-header' ? (
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="secondText" id="secondText-label">Right column</label>
              <textarea className="dqpl-textarea" id="secondText" value={this.state.singleSlide.secondText} onChange={this.handleChange} aria-labelledby="secondText-label-label" />
            </div>
          ) : null }

          {/* codeText - conditional ---------------------------------*/}
          { this.state.singleSlide.template === 'repl' ? (
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="codeText" id="codeText-label">Code</label>
              <textarea className="dqpl-textarea" id="codeText" value={this.state.singleSlide.codeText} onChange={this.handleChange} aria-labelledby="codeText-label-label" />
            </div>
          ) : null }

          {/* presenterNotes -----------------------------------------*/}
          <div className="dqpl-field-wrap">
            <label className="dqpl-label" htmlFor="presenterNotes" id="presenterNotes-label">Presenter Notes</label>
            <textarea className="dqpl-textarea" id="presenterNotes" value={this.state.singleSlide.presenterNotes} onChange={this.handleChange} aria-labelledby="presenterNotes-label" />
          </div>

          {/* save and clear buttons ---------------------------------*/}
          <button className="dqpl-button-primary" type="button" onClick={this.handleSubmit}>Save</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  deck: state.deck,
  singleSlide: state.slide.singleSlide,
  deckLength: state.slide.slideList.length,
});

const mapDispatch = dispatch => ({
  loadSlide(slideId) { return dispatch(fetchSingleSlide(slideId)); },
  updateSlide(slideId, slideObject) { dispatch(changeSlide(slideId, slideObject)); },
});

export default connect(mapState, mapDispatch)(EditSlideForm);
