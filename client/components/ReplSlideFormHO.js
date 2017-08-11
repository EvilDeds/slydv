import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReplSlideForm from './ReplSlideForm';
import { createReplSlide, changeReplSlide, fetchSingleReplSlide } from '../store/replSlide.js';
import store from '../store';

/* -------------- COMPONENT -------------- */

function ReplSlideFormHO(Component, thunkCreator) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        slideId: null,
        slideToEdit: null,
        formReplSlide: {}
      }
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      // console.log('this.props: ', this.props);
      // console.log('this.props.match.params.slideId:', this.props.match.params.slideId);
      if(this.props.match.params.slideId) {
        this.state.slideId = this.props.match.params.slideId;
        // console.log('Component did mount. this.state:', this.state);
      }
      store.dispatch(fetchSingleReplSlide(this.state.slideId));
    }

    componentWillReceiveProps(nextProps) {
      // console.log('nextProps: ', nextProps);
      if(nextProps.singleReplSlide !== this.props.singleReplSlide) {
        this.setState({
          formReplSlide: nextProps.singleReplSlide
        })
      }
    }

    handleChange(evt) {
      this.setState({
        formReplSlide: {[evt.target.name]: evt.target.value}
      })
    }

    render() {
      return (
        <Component handleSubmit={ this.handleSubmit } handleChange={ this.handleChange } formReplSlide={ this.state.formReplSlide } { ...this.props } />
      )
    }
  }
}

/* -------------- CONTAINER --------------
 We have two different sets of 'mapStateToProps' and 'mapDispatchToProps'functions—one for Change, and one for
 Create. They share the same form component, ReplSlideForm.
*/
const mapAddReplSlide = (state) => {
  return {
    name: 'createReplSlide',
    displayName: 'Add REPL slide',
    error: state.replSlide.singleReplSlide.error
  };
};

const mapEditReplSlide = (state) => {
  // console.log('state:', state)
  return {
    name: 'changeReplSlide',
    displayName: 'Edit REPL slide',
    error: state.replSlide.singleReplSlide.error,
    singleReplSlide: state.replSlide.singleReplSlide || {}
  };
};

const mapDispatchAdd = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const slideTitle = evt.target.slideTitle.value;
      const initialCode = evt.target.initialCode.value;
      const speakerNotes = evt.target.speakerNotes.value;
      const changedReplSlide = { slideTitle, initialCode, speakerNotes };
      dispatch(createReplSlide(newReplSlide));
      // Need to do state.setState({formReplSlide: {}}); and then redirect somewhere.
    }
  };
};

const mapDispatchEdit = (dispatch) => {
  return {
    handleSubmit(evt, slideId) {
      evt.preventDefault();
      const slideTitle = evt.target.slideTitle.value;
      const initialCode = evt.target.initialCode.value;
      const speakerNotes = evt.target.speakerNotes.value;
      const changedReplSlide = { slideTitle, initialCode, speakerNotes };
      dispatch(changeReplSlide(slideId, changedReplSlide));
      // Need to do state.setState({formReplSlide: {}}); and then redirect somewhere.
    }
  };
};

export const AddReplSlide = connect(mapAddReplSlide, mapDispatchAdd)(ReplSlideFormHO(ReplSlideForm, createReplSlide));
export const EditReplSlide = connect(mapEditReplSlide, mapDispatchEdit)(ReplSlideFormHO(ReplSlideForm, changeReplSlide));
