import brace from 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'brace/theme/github';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AceEditor from 'react-ace';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { changeSlide, fetchSingleSlide, createSlide, fetchDeck } from '../store';

class EditSlideForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckLength: props.deckLength,
      errorToast: props.errorToast,
      errorType: props.errorType,
      isDirty: props.isDirty,
      cleanButtonClassName: props.cleanButtonClassName,
      dirtyButtonClassName: props.dirtyButtonClassName,
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleErrorToastClick = this.handleErrorToastClick.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleReplChange = this.handleReplChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitFromErrorToast = this.handleSubmitFromErrorToast.bind(this);
    this.handleSavedToastClick = this.handleSavedToastClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  componentDidMount() {
    this.props.loadSlide(this.props.match.params.slideId)
      .then((newSingleSlideAction) => {
        this.setState(Object.assign({}, this.state,
          { singleSlide: newSingleSlideAction.singleSlide }));
        return this.props.getDeck(newSingleSlideAction.singleSlide.deckId);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.singleSlide.id !== this.props.singleSlide.id) {
      this.props.loadSlide(nextProps.singleSlide.id)
        .then((newSingleSlideAction) => {
          this.setState(Object.assign({}, this.state,
            { singleSlide: newSingleSlideAction.singleSlide }));
          this.props.getDeck(newSingleSlideAction.singleSlide.deckId);
        });
    }
  }

  handleChange(evt) {
    this.state.saved = false;
    this.state.isDirty = true;
    this.state.dirtyButtonClassName = 'dqpl-button-secondary';
    this.state.cleanButtonClassName = 'dqpl-button-primary';
    this.state.singleSlide[evt.target.id] = evt.target.value;
    this.setState(this.state);
  }

  // Close the error toast without making a decision about saving the current slide
  handleErrorToastClick() {
    // console.log('error toast was closed without resolution');
    this.setState({
      errorToast: false,
      errorType: '',
    });
  }

  handleNewClick() {
    const position = this.props.deck.slides.length + 1;
    const deckId = this.props.deck.id;
    const newSlide = {
      deckId,
      title: '',
      firstText: '',
      secondText: '',
      template: 'single-pane',
      codeText: '',
      positionInDeck: position,
      presenterNotes: '',
    };

    // If the current slide has been changed but not saved, show an error toast
    if (this.state.isDirty) {
      this.setState({
        errorToast: true,
        errorType: 'new-before-save',
      });
    } else {
      this.setState({
        saved: false,
      });
      this.props.sendSlide(newSlide);
    }
  }

  // If there was an error toast and the user decided to create a new slide anyway. This doesn't work, so the link is disabled.
  handleNewClickFromErrorToast() {
    const position = this.state.deckLength + 1;
    const deckId = this.props.deck.id;
    const newSlide = {
      deckId,
      title: '',
      firstText: '',
      secondText: '',
      template: 'single-pane',
      codeText: '',
      positionInDeck: position,
      presenterNotes: '',
    };
    console.log('newSlide:', newSlide);
    this.props.sendSlide(newSlide);
  }

  handleReplChange(evt) {
    this.state.isDirty = true;
    this.state.singleSlide.codeText = evt;
    this.setState(this.state);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateSlide(this.state.singleSlide.id, this.state.singleSlide)
      .then(() => this.setState({
        errorToast: false,
        errorType: '',
        saved: true,
        cleanButtonClassName: 'dqpl-button-secondary',
        dirtyButtonClassName: 'dqpl-button-primary',
      }));
    this.setState({
      isDirty: false,
    });
    setTimeout(() => {
      this.setState({
        saved: false,
      });
    }, 5000);
  }

  // If there was an error toast and the user decided to save the current slide
  handleSubmitFromErrorToast(evt) {
    evt.preventDefault();
    const char = evt.which || evt.keyCode;
    if ((evt.type === 'keydown' && char === 32) || evt.type === 'click') {
      this.props.updateSlide(this.state.singleSlide.id, this.state.singleSlide)
        .then(() => this.setState({
          errorToast: false,
          errorType: '',
          saved: true,
          isDirty: false,
          cleanButtonClassName: 'dqpl-button-secondary',
          dirtyButtonClassName: 'dqpl-button-primary',
        }));
      setTimeout(() => {
        this.setState({
          saved: false,
        });
      }, 5000);
    }
  }

  handleSavedToastClick() {
    this.setState({
      isDirty: false,
      saved: false,
    });
  }

  handleViewClick() {
    if (this.state.isDirty) {
      this.setState({
        errorToast: true,
        errorType: 'view-before-save',
      });
    } else {
      this.props.history.push(`/decks/${this.props.deck.id}/live`);
    }
  }

  render() {
    // console.log('this.state:', this.state);
    // console.log('this.props:', this.props);
    let errorContinue = null;
    if (this.state.errorType) {
      if (this.state.errorType === 'view-before-save') {
        errorContinue = <Link to={`/decks/${this.props.deck.id}/live`}>Or preview anyway?</Link>;
      } {/* else {
        errorContinue = (<Link
          onClick={this.handleNewClickFromErrorToast}
          to={this.props.match.url}
        >Or create a new slide anyway?</Link>);*/
      }
    }

    return (
      <DocumentTitle title="Edit Slide | SlyDv">
        <div className="edit-slide-form">
          {/* positionInDeck -----------------------------------------*/
            this.props.deck && this.props.deck.slides
              ? <h2><span className="header-label">Deck:</span> <Link to={`/decks/${this.props.deck.id}`} className="deck-title">{this.props.deck.deckTitle}</Link><br /><span className="header-label">Slide:</span> {`${this.state.singleSlide.positionInDeck} of ${this.props.deck.slides.length}`}</h2>
              : null
          }

          {/* did user try to view or new without saving? ---------*/}
          { this.state.isDirty && this.state.errorToast ? (
            <div className="dqpl-toast dqpl-toast-error">
              <div className="dqpl-toast-message">
                <div className="fa fa-minus-circle" aria-hidden="true" />
                <span>Your changes are not saved.
                  <Link to={`/editslide/${this.props.singleSlide.id}`} className="save-from-toast" role="button" onClick={this.handleSubmitFromErrorToast} onKeyDown={this.handleSubmitFromErrorToast}>Save now</Link>? {errorContinue}
                </span>
              </div>
              <button className="dqpl-toast-dismiss fa fa-close" type="button" aria-label="Dismiss notification" onClick={this.handleErrorToastClick} />
            </div>
          ) : null
          }

          {/* was the form saved? ------------------------------------*/}
          { this.state.saved ? (
            <div className="dqpl-toast dqpl-toast-success">
              <div className="dqpl-toast-message">
                <div className="fa fa-info-circle" aria-hidden="true" /><span>Changes saved.</span>
              </div>
              <button className="dqpl-toast-dismiss fa fa-close" type="button" aria-label="Dismiss notification" onClick={this.handleSavedToastClick} />
            </div>
          ) : null
          }

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
                <AceEditor
                  aria-labelledby="codeText-label"
                  editorProps={{
                    $blockScrolling: true,
                  }}
                  fontSize={12}
                  highlightActiveLine
                  mode="javascript"
                  name="codeText"
                  onChange={this.handleReplChange}
                  setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: true,
                    showLineNumbers: true,
                    tabSize: 2,
                    showInvisibles: true,
                  }}
                  theme="github"
                  value={`${this.state.singleSlide.codeText}`}
                  width="100%"
                  height="45vh"
                  wrapEnabled
                />
              </div>
            ) : null }

            {/* presenterNotes -----------------------------------------*/}
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="presenterNotes" id="presenterNotes-label">Presenter Notes</label>
              <textarea className="dqpl-textarea" id="presenterNotes" value={this.state.singleSlide.presenterNotes} onChange={this.handleChange} aria-labelledby="presenterNotes-label" />
            </div>

            <hr />

            {/* save and clear buttons ---------------------------------*/}
            <div className="button-row">
              <button className={this.state.cleanButtonClassName} type="button" onClick={this.handleSubmit}>Save</button>
              <button className={this.state.dirtyButtonClassName} type="button" onClick={this.handleViewClick}>View</button>
              <button className={`${this.state.dirtyButtonClassName} new-slide`} type="button" onClick={this.handleNewClick}>New Slide</button></div>
          </form>
        </div>
      </DocumentTitle>
    );
  }
}

const mapState = state => ({
  deck: state.deck,
  singleSlide: state.slide.singleSlide,
  deckLength: state.slide.slideList.length,
});

const mapDispatch = (dispatch, ownProps) => ({
  loadSlide(slideId) { return dispatch(fetchSingleSlide(slideId)); },
  updateSlide(slideId, slideObject) { return dispatch(changeSlide(slideId, slideObject)); },
  sendSlide(slide) { return dispatch(createSlide(slide, ownProps.history)); },
  getDeck(deckId) { return dispatch(fetchDeck(deckId)); },
});

export default withRouter(connect(mapState, mapDispatch)(EditSlideForm));

/* ----- PROP TYPES AND DEFAULTS ----- */

EditSlideForm.propTypes = {
  deck: PropTypes.shape({
    deckTitle: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    slides: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
  deckLength: PropTypes.number,
  errorToast: PropTypes.bool,
  errorType: PropTypes.string,
  getDeck: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  isDirty: PropTypes.bool,
  loadSlide: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slideId: PropTypes.string.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  cleanButtonClassName: PropTypes.string,
  dirtyButtonClassName: PropTypes.string,
  saved: PropTypes.bool,
  sendSlide: PropTypes.func.isRequired,
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

EditSlideForm.defaultProps = {
  deck: {
    slides: [],
  },
  deckLength: 1,
  errorToast: false,
  errorType: '',
  isDirty: false,
  cleanButtonClassName: 'dqpl-button-secondary',
  dirtyButtonClassName: 'dqpl-button-primary',
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
