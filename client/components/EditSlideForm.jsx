import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSlide, fetchSingleSlide } from '../store';
// import NewSlideButton from './index';
import NewSlideButton from './NewSlideButton';

class EditSlideForm extends Component {
  static propTypes = {
    loadSlide: PropTypes.func.isRequired,
    saved: PropTypes.boolean,
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
    updateSlide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    saved: false,
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
  };

  constructor(props) {
    super(props);
    this.state = {
      saved: props.saved,
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
      // deckLength: props.deckLength,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToastClick = this.handleToastClick.bind(this);
  }

  componentDidMount() {
    this.props.loadSlide(this.props.match.params.slideId)
      .then((newSingleSlideAction) => {
        this.setState(Object.assign({}, this.state,
          { singleSlide: newSingleSlideAction.singleSlide }));
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.singleSlide.id !== this.props.singleSlide.id) {
      this.props.loadSlide(nextProps.singleSlide.id)
        .then((newSingleSlideAction) => {
          this.setState(Object.assign({}, this.state,
            { singleSlide: newSingleSlideAction.singleSlide }));
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
    this.props.updateSlide(this.state.singleSlide.id, this.state.singleSlide)
      .then(returnedUpdateSlideAction => this.setState({ saved: true }));
  }

  handleToastClick() {
    this.setState({ saved: false });
  }

  render() {
    // console.log('EditSlideForm: this.props:', this.props);
    console.log('EditSlideForm: this.state.singleSlide.deckId:', this.state.singleSlide.deckId);
    return (
      <div className="EditSlideForm">
        {/* positionInDeck -----------------------------------------*/}
        {/* <h2>Slide {this.state.singleSlide.positionInDeck} of {this.state.deckLength}</h2> */}

        {/* was the form saved? ------------------------------------*/}
        { this.state.saved ? (
          <div className="dqpl-toast dqpl-toast-success">
            <div className="dqpl-toast-message">
              <div className="fa fa-info-circle" aria-hidden="true" /><span>Changes saved.</span>
            </div>
            <button className="dqpl-toast-dismiss fa fa-close" type="button" aria-label="Dismiss notification" onClick={this.handleToastClick} />
          </div>
        ) : null }

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
            { this.props.singleSlide.id && <NewSlideButton deckId={this.props.singleSlide.deckId} /> }
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  deck: state.deck,
  singleSlide: state.slide.singleSlide,
});

const mapDispatch = dispatch => ({
  loadSlide(slideId) { return dispatch(fetchSingleSlide(slideId)); },
  updateSlide(slideId, slideObject) { return dispatch(changeSlide(slideId, slideObject)); },
});

export default connect(mapState, mapDispatch)(EditSlideForm);
