import React from 'react';
import Embed from 'react-runkit';
import { connect } from 'react-redux';
import socket from '../socket';
import { getSingleSlide } from '../store';


class Runkit extends React.Component {
  constructor(props) {
    super(props);
    this.changeCode = this.changeCode.bind(this);
  }

  changeCode() {
    // (this.source and event are undefined, but we can update state in the callback below)
    this.refs.embed.getSource(code => this.props.changeSlideCode(code, this.props.currentSlide));

  }

  render() {
    return (
      <Embed
        source={this.props.currentSlide.codeText}
        readOnly={ false }
        onEvaluate={this.changeCode}
        ref="embed"
        minHeight="250px"
      />
    )
  }
}

const mapState = state => ({
  currentSlide: state.slide.singleSlide,
});

const mapDispatch = dispatch => ({
  changeSlideCode(code, slide) {
    const newSlide = { ...slide, codeText: code };
    dispatch(getSingleSlide(newSlide));
    socket.emit('change-slide', newSlide);
  },
});

export default connect(mapState, mapDispatch)(Runkit);
