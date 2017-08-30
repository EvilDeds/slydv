/* eslint-env browser */
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

/* -------------- COMPONENT -------------- */

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
        codeText: props.singleSlide.codeText || '',
        id: props.singleSlide.id || null,
        positionInDeck: props.singleSlide.positionInDeck || null,
        presenterNotes: props.singleSlide.presenterNotes || '',
        template: props.singleSlide.template || '',
        firstText: props.singleSlide.firstText || '',
        secondText: props.singleSlide.secondText || '',
        title: props.singleSlide.title || '',
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

    // Refresh Deque JS whenever the page changes, to activate the title tooltip.
    const dqplEvt = new Event('dqpl:ready');
    document.dispatchEvent(dqplEvt);
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

  handleChange(e) {
    this.state.saved = false;
    this.state.isDirty = true;
    this.state.dirtyButtonClassName = 'dqpl-button-secondary';
    this.state.cleanButtonClassName = 'dqpl-button-primary';
    this.state.singleSlide[e.target.id] = e.target.value;
    this.setState(this.state);
  }

  // Close the error toast without making a decision about saving the current slide
  handleErrorToastClick() {
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

  handleReplChange(e) {
    this.state.saved = false;
    this.state.isDirty = true;
    this.state.dirtyButtonClassName = 'dqpl-button-secondary';
    this.state.cleanButtonClassName = 'dqpl-button-primary';
    this.state.singleSlide.codeText = e;
    this.setState(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
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
  handleSubmitFromErrorToast(e) {
    e.preventDefault();
    const char = e.which || e.keyCode;
    if ((e.type === 'keydown' && char === 32) || e.type === 'click') {
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
      this.props.history.push(`/decks/${this.props.deck.id}/static`);
    }
  }

  render() {
    let errorContinue = null;
    if (this.state.errorType) {
      if (this.state.errorType === 'view-before-save') {
        errorContinue = <Link to={`/decks/${this.props.deck.id}/static`}>Or discard your changes and preview anyway?</Link>;
      }
    }
    let titleVisibility;
    let titleTooltip;
    if (this.state.singleSlide.template === 'columns-header') {
      titleVisibility = 'visible-title';
    } else {
      titleVisibility = 'hidden-title';
      titleTooltip = (
        <div className="dqpl-help-button-wrap">
          <button aria-describedby="title-tooltip-label" aria-label="Slide title help" className="dqpl-help-button" data-help-text="This template does not render the contents of the title field, but you will still see this title on the deck overview. To add a visible title to this slide, include a Markdown heading within the first text field." type="button">
            <div aria-hidden="true" className="fa fa-question-circle" />
          </button>
          <div className="dqpl-tooltip" id="title-tooltip-label" role="tooltip">This template does not render the contents of the title field, but you will still see this title on the deck overview. To add a visible title to this slide, include a Markdown heading within the first text field.</div>
        </div>
      );
    }

    return (
      <DocumentTitle title="Edit Slide | SlyDv">
        <div className="edit-slide-form">
          <h1>Edit Slide</h1>

          <p className="instructions"><em>All text fields on this form { this.state.singleSlide.template === 'repl' ? 'except “Code”' : null } accept <a href="https://guides.github.com/features/mastering-markdown/">GitHub-flavored Markdown</a>.</em></p>

          {/* positionInDeck -----------------------------------*/
            this.props.deck && this.props.deck.slides
              ? <h3><span className="header-label">Deck:</span> <Link className="deck-title" to={`/decks/${this.props.deck.id}`}>{this.props.deck.deckTitle}</Link><br /><span className="header-label">Slide:</span> {`${this.state.singleSlide.positionInDeck} of ${this.props.deck.slides.length}`}</h3>
              : null
          }

          {/* did user try to view or new without saving? ------*/}
          { this.state.isDirty && this.state.errorToast ? (
            <div className="dqpl-toast dqpl-toast-error">
              <div className="dqpl-toast-message">
                <div aria-hidden="true" className="fa fa-minus-circle" />
                <span>Your changes are not saved.
                  <Link className="save-from-toast" onClick={this.handleSubmitFromErrorToast} onKeyDown={this.handleSubmitFromErrorToast} role="button" to={`/editslide/${this.props.singleSlide.id}`}>Save now</Link>? {errorContinue}
                </span>
              </div>
              <button aria-label="Dismiss notification" className="dqpl-toast-dismiss fa fa-close" onClick={this.handleErrorToastClick} type="button" />
            </div>
          ) : null
          }

          {/* was the form saved? ----------------------------*/}
          { this.state.saved ? (
            <div className="dqpl-toast dqpl-toast-success">
              <div className="dqpl-toast-message">
                <div aria-hidden="true" className="fa fa-info-circle" /><span>Changes saved.</span>
              </div>
              <button aria-label="Dismiss notification" className="dqpl-toast-dismiss fa fa-close" onClick={this.handleSavedToastClick} type="button" />
            </div>
          ) : null
          }

          <form
            onSubmit={this.state.handleSubmit}
          >
            {/* template ---------------------------------------*/}
            <div className="dqpl-field-wrap">
              <div className="dqpl-label" id="template-label">Change slide template</div>
              <div className="dqpl-select">
                <select aria-labelledby="template-label" id="template" onChange={this.handleChange} value={this.state.singleSlide.template}>
                  <option value="mid-page">single pane starting mid-page</option>
                  <option value="single-pane">single pane</option>
                  <option value="columns">2 columns</option>
                  <option value="columns-header">header + 2 columns</option>
                  <option value="repl">text + REPL</option>
                </select>
              </div>
            </div>

            {/* title - conditional label ----------------------*/}
            <div className={`dqpl-field-wrap ${titleVisibility}`}>
              <label className="dqpl-label" htmlFor="title" id="title-label">Title</label>
              <div className="dqpl-field-help">
                <input aria-labelledby="title-label" className="dqpl-text-input" id="title" onChange={this.handleChange} type="text" value={this.state.singleSlide.title} />
                {titleTooltip}
              </div>
            </div>

            {/* firstText --------------------------------------*/}
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="firstText" id="firstText-label">{ this.state.singleSlide.template === 'columns' || this.state.singleSlide.template === 'columns-header' ? 'Left column' : 'Text'}</label>
              <textarea aria-labelledby="firstText-label-label" className="dqpl-textarea" id="firstText" onChange={this.handleChange} value={this.state.singleSlide.firstText} />
            </div>

            {/* secondText - conditional -----------------------*/}
            { this.state.singleSlide.template === 'columns' || this.state.singleSlide.template === 'columns-header' ? (
              <div className="dqpl-field-wrap">
                <label className="dqpl-label" htmlFor="secondText" id="secondText-label">Right column</label>
                <textarea aria-labelledby="secondText-label-label" className="dqpl-textarea" id="secondText" onChange={this.handleChange} value={this.state.singleSlide.secondText} />
              </div>
            ) : null }

            {/* codeText - conditional -------------------------*/}
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
                  width="50%"
                  height="45vh"
                  wrapEnabled
                />
              </div>
            ) : null }

            {/* presenterNotes ---------------------------------*/}
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="presenterNotes" id="presenterNotes-label">Presenter Notes</label>
              <textarea aria-labelledby="presenterNotes-label" className="dqpl-textarea" id="presenterNotes" onChange={this.handleChange} value={this.state.singleSlide.presenterNotes} />
            </div>

            <hr />

            {/* save and clear buttons -------------------------*/}
            <div className="button-row">
              <button className={this.state.cleanButtonClassName} onClick={this.handleSubmit} type="button">Save</button>
              <button className={this.state.dirtyButtonClassName} onClick={this.handleViewClick} type="button">View</button>
              <button className={`${this.state.dirtyButtonClassName} new-slide`} onClick={this.handleNewClick} type="button">New Slide</button></div>
          </form>
        </div>
      </DocumentTitle>
    );
  }
}

/* -------------- CONTAINER -------------- */

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

/* -------------- PROP TYPES -------------- */

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
  singleSlide: PropTypes.shape(),
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
  singleSlide: {},
};
