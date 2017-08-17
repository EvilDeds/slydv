import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSingleSlide } from '../store';

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
      id: 1,
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

  componentDidMount(){
    this.props.loadSlide(this.props.match.params.slideId); //??????
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.slide.singleSlide !== this.props.slide.singleSlide) {
      this.props.loadSlide(nextProps.slide.singleSlide.id);
    }
  }

  constructor(props) {
    super();
    this.state = {
      singleSlide: {
        codeText: props.singleSlide.codeText,
        deckLength: props.deckLength,
        id: props.singleSlide.id,
        positionInDeck: props.singleSlide.positionInDeck,
        presenterNotes: props.singleSlide.presenterNotes,
        template: props.singleSlide.template,
        firstText: props.singleSlide.firstText,
        secondText: props.singleSlide.secondText,
        title: props.singleSlide.title
      }

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      singleSlide: { [evt.target.id]: evt.target.value },
    });
  }

  handleSubmit(evt) {
  // ???
  }

  render() {
    return (
      <div className="EditSlideForm">
        {/* positionInDeck -----------------------------------------*/}
        <h2>Slide {this.state.singleSlide.positionInDeck} of </h2>
        <form
          onSubmit={this.state.handleSubmit}
          // onChange={this.state.handleChange}
        >
          {/* template -----------------------------------------------*/}
          <div className="dqpl-field-wrap">
            <div className="dqpl-label" id="template-label">Change slide template</div>
            <div className="dqpl-select">
              <select id="template" onChange={this.handleChange} >
                <option  value="mid-page">single pane starting mid-page</option>
                <option  value="single-pane">single pane</option>
                <option  value="columns">2 columns</option>
                <option  value="columns-header">header + 2 columns</option>
                <option  value="repl">Header + REPL</option>
              </select>
            </div>
          </div>

          {/* title - conditional ------------------------------------*/}
          { this.state.singleSlide.template === 'columns-header' || this.state.singleSlide.template === 'repl' ? (
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="title">Title</label>
              <input className="dqpl-text-input" type="text" id="title" value={this.state.singleSlide.title} onChange={this.handleChange}/>
            </div>
          ) : null }

          {/* firstText - conditional --------------------------------*/}
          { this.state.singleSlide.template !== 'repl' ? (
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="firstText">{ this.state.singleSlide.template === 'columns' || this.state.singleSlide.template === 'columns-header' ? 'Left column' : 'Text'}</label>
              <textarea className="dqpl-textarea" id="firstText" value={this.state.singleSlide.firstText} onChange={this.handleChange}/>
            </div>
          ) : null }

          {/* secondText - conditional ------------------------------------*/}
          { this.state.singleSlide.template === 'columns' || this.state.singleSlide.template === 'columns-header' ? (
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="secondText">Right column</label>
              <textarea className="dqpl-textarea" id="secondText" value={this.state.singleSlide.secondText} onChange={this.handleChange}/>
            </div>
          ) : null }

          {/* codeText - conditional ---------------------------------*/}
          { this.state.singleSlide.template === 'repl' ? (
            <div className="dqpl-field-wrap">
              <label className="dqpl-label" htmlFor="codeText">Code</label>
              <textarea className="dqpl-textarea" id="codeText" value={this.state.singleSlide.codeText} onChange={this.handleChange}/>
            </div>
          ) : null }

          {/* presenterNotes -----------------------------------------*/}
          <div className="dqpl-field-wrap">
            <label className="dqpl-label" htmlFor="presenterNotes">Presenter Notes</label>
            <textarea className="dqpl-textarea" id="presenterNotes" value={this.state.singleSlide.presenterNotes} onChange={this.handleChange}/>
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
  loadSlide(slideId) { dispatch(fetchSingleSlide(slideId)) }
});

export default connect(mapState, mapDispatch)(EditSlideForm);

