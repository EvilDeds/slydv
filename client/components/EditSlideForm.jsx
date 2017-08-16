import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditSlideForm extends Component {
  static propTypes = {
    deckLength: PropTypes.number,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    singleSlide: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      text: PropTypes.string,
      template: PropTypes.string,
      codeText: PropTypes.string,
      positionInDeck: PropTypes.number,
      presenterNotes: PropTypes.string,
    }),
  };

  static defaultProps = {
    singleSlide: {
      id: 1,
      title: 'This is a slide title',
      text: '# Slide text\nThis is the text of a slide, which is in Markdown.!%%%!It has two columns, separated by an unlikely sequence of punctuation marks.',
      // template: 'mid-page',
      template: 'single-pane',
      // template: 'columns-header',
      // template: 'columns',
      // template: 'repl',
      codeText: 'let foo = 6; let bar = 7; let baz = foo + bar; baz();',
      positionInDeck: 1,
      presenterNotes: 'This is a speaker note in Markdown.',
    },
    deckLength: 1,
    handleChange: function(evt) {console.log('handleChange was called! event:', evt);},
    handleSubmit: function(evt) {console.log('handleSubmit was called! event:', evt);},
  };

  constructor(props) {
    super();
    this.state = {
      codeText: props.singleSlide.codeText,
      deckLength: props.deckLength,
      handleChange: props.handleChange,
      handleSubmit: props.handleSubmit,
      id: props.singleSlide.id,
      positionInDeck: props.singleSlide.positionInDeck,
      presenterNotes: props.singleSlide.presenterNotes,
      template: props.singleSlide.template,
      text: props.singleSlide.text,
      title: props.singleSlide.title,
    }

    this.handleChange = this.handleChange.bind(this);
  }

    handleChange(evt) {
      this.setState({
        singleSlide: { [evt.target.name]: evt.target.value },
      });
    }

    render() {
      return (
        <div className="EditSlideForm">
          {/* positionInDeck -----------------------------------------*/}
          <h2>Slide {this.state.positionInDeck} of </h2>
          <form
            onSubmit={this.state.handleSubmit}
            onChange={this.state.handleChange}>

            {/* template -----------------------------------------------*/}
            <div className="dqpl-field-wrap">
              <div className="dqpl-label" id="template-label">Slide template</div>
              <div className="dqpl-select">
                <div className="dqpl-combobox" role="combobox" tabIndex="0" aria-autocomplete="none" aria-owns="template-list" aria-expanded="false" aria-labelledby="template-label" aria-required="true" aria-activedescendant="default">
                  <div className="dqpl-pseudo-value">single-pane</div>
                </div>
                <ul className="dqpl-listbox" role="listbox" id="template">
                  <li className="dqpl-option" role="option">mid-page</li>
                  <li className="dqpl-option" role="option" id="default">single-pane</li>
                  <li className="dqpl-option" role="option">columns</li>
                  <li className="dqpl-option" role="option">columns-header</li>
                  <li className="dqpl-option" role="option">repl</li>
                </ul>
              </div>
            </div>

            {/* title - conditional ------------------------------------*/}
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="title">Title</label>
              <input className="dqpl-text-input" type="text" id="title" value={this.state.title} />
            </div>

            {/* text ---------------------------------------------------*/}
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="text">Text</label>
              <textarea className="dqpl-textarea" id="text" value={this.state.text}></textarea>
            </div>

            {/* codeText - conditional ---------------------------------*/}
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="codeText">Code</label>
              <textarea className="dqpl-textarea" id="codeText" value={this.state.codeText}></textarea>
            </div>

            {/* presenterNotes -----------------------------------------*/}
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="presenterNotes">Presenter Notes</label>
              <textarea className="dqpl-textarea" id="presenterNotes" value={this.state.presenterNotes}></textarea>
            </div>

            {/* save and clear buttons ---------------------------------*/}
            <div className="form-group">
              <label
                className="col-md-4 control-label"
                htmlFor="SaveAndNew"
                type="submit"
              >Save + New</label>
              <div className="col-md-8">
                <button
                  id="SaveAndNew"
                  name="SaveAndNew"
                  className="btn btn-success"
                >Save + New</button>
                <button
                  id="ClearForm"
                  name="ClearForm"
                  className="btn btn-danger"
                >Clear Form</button>
              </div>
            </div>

            {/* textify button - I forget what this does ---------------*/}
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="textify">Textify</label>
              <div className="col-md-4">
                <button id="textify" name="textify" className="btn btn-primary">Textify</button>
              </div>
            </div>
          </form>
        </div>
      );
    }
};
