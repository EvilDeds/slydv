import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Embed from 'react-runkit';
import socket from '../socket';
import { getSingleSlide } from '../store';


class Runkit extends React.Component {
  constructor(props) {
    super(props);
    this.changeCode = this.changeCode.bind(this);
    // this.run = this.run.bind(this);
    // this.state = {
    //   loadFunc: () => {},
    // };
  }

  /* These functions are not currently working as we’d like.
      There is no current obvious way to get Runkit to evaluate
      other than when it loads or when the URL changes.
      onLoad={this.state.loadFunc} */

  // componentWillReceiveProps(nextProps) {
  //   const { currentSlide } = this.props;
  //   const nextSlide = nextProps.currentSlide;
  //   if (currentSlide.id === nextSlide.id
  //       && currentSlide.codeText !== nextSlide.codeText) {
  //     this.setState({ loadFunc: this.run });
  //   }
  // }

  // run() {
  //   return this.refs.embed.evaluate();
  // }

  changeCode() {
    this.refs.embed.getSource(code => this.props.changeSlideCode(code, this.props.currentSlide));
  }

  render() {
    return (
      <Embed
        source={this.props.currentSlide.codeText}
        readOnly={false}
        onEvaluate={this.changeCode}
        ref="embed"
        minHeight="100px"
      />
    );
  }
}

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  currentSlide: state.slide.singleSlide,
});

const mapDispatch = dispatch => ({
  changeSlideCode(code, slide) {
    const newSlide = { ...slide, codeText: code };
    socket.emit('change-slide', newSlide);
    dispatch(getSingleSlide(newSlide));
  },
});

export default connect(mapState, mapDispatch)(Runkit);

/* -------------- PROP TYPES -------------- */

Runkit.propTypes = {
  changeSlideCode: PropTypes.func.isRequired,
  currentSlide: PropTypes.shape().isRequired,
};
