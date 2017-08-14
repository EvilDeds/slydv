import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReplSlideForm from './ReplSlideForm.jsx';
import { createSlide, changeSlide, fetchSingleSlide } from '../store/slide';
import store from '../store';

/* -------------- COMPONENT -------------- */

function ReplSlideFormHO(Component) {
  return class extends React.Component {
    static propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          slideId: PropTypes.number,
        }),
      }).isRequired,
      singleSlide: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.string,
        isRepl: PropTypes.bool,
        codeText: PropTypes.string,
        isHead: PropTypes.bool,
        nextId: PropTypes.string,
        prevId: PropTypes.string,
      }),
    };

    static defaultProps = {
      singleSlide: {},
    };

    constructor(props) {
      super(props);
      this.state = {
        slideId: null,
        slideToEdit: null,
        formReplSlide: {
          slideTitle: 'foooooooo',
        },
      };

      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      // console.log('this.props: ', this.props);
      // console.log('this.props.match.params.slideId:', this.props.match.params.slideId);
      if (this.props.match.params.slideId) {
        this.state.slideId = this.props.match.params.slideId;
        // console.log('Component did mount. this.state:', this.state);
      }
      store.dispatch(fetchSingleSlide(this.state.slideId));
    }

    componentWillReceiveProps(nextProps) {
      // console.log('nextProps: ', nextProps);
      if (nextProps.singleSlide !== this.props.singleSlide) {
        this.setState({
          formReplSlide: nextProps.singleSlide,
        });
      }
    }

    handleChange(evt) {
      this.setState({
        formReplSlide: { [evt.target.name]: evt.target.value },
      });
    }

    render() {
      // console.log('this.state.formReplSlide:', this.state.formReplSlide);
      return (
        <Component
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          formReplSlide={this.state.formReplSlide}
          {...this.props}
        />
      );
    }
  };
}

// ReplSlideFormHO.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       slideId: PropTypes.number,
//     }),
//   }).isRequired,
//   singleSlide: PropTypes.shape({
//     title: PropTypes.string,
//     text: PropTypes.string,
//     isRepl: PropTypes.boolean,
//     codeText: PropTypes.string,
//     isHead: PropTypes.boolean,
//     nextId: PropTypes.string,
//     prevId: PropTypes.string,
//   }),
// };

/* -------------- CONTAINER --------------
 We have two different sets of 'mapStateToProps' and 'mapDispatchToProps' functions—
 one for Change, and one for Create. They share the same form component, ReplSlideForm.
*/
const mapAddReplSlide = state => ({
  name: 'createSlide',
  displayName: 'Add REPL slide',
  error: state.slide.singleSlide.error,
});

const mapEditReplSlide = state => ({
  name: 'changeSlide',
  displayName: 'Edit REPL slide',
  error: state.slide.singleSlide.error,
  singleSlide: state.slide.singleSlide || {},
});

const mapDispatchAdd = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const slideTitle = evt.target.slideTitle.value;
    const initialCode = evt.target.initialCode.value;
    const speakerNotes = evt.target.speakerNotes.value;
    const newReplSlide = { slideTitle, initialCode, speakerNotes };
    dispatch(createSlide(newReplSlide));
    // Need to do state.setState({formReplSlide: {}}); and then redirect somewhere.
  },
});

const mapDispatchEdit = dispatch => ({
  handleSubmit(evt, slideId) {
    evt.preventDefault();
    const slideTitle = evt.target.slideTitle.value;
    const initialCode = evt.target.initialCode.value;
    const speakerNotes = evt.target.speakerNotes.value;
    const changedReplSlide = { slideTitle, initialCode, speakerNotes };
    dispatch(changeSlide(slideId, changedReplSlide));
    // Need to do state.setState({formReplSlide: {}}); and then redirect somewhere.
  },
});

export const AddReplSlide =
  connect(mapAddReplSlide, mapDispatchAdd)(ReplSlideFormHO(ReplSlideForm, createSlide));
export const EditReplSlide =
  connect(mapEditReplSlide, mapDispatchEdit)(ReplSlideFormHO(ReplSlideForm, changeSlide));
