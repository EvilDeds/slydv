import React from 'react';
import PropTypes from 'prop-types';
import { Runkit } from './index';

// template === 'repl'
export default function SlideView5(props) {
  const { text, codeText } = props.singleSlide;

  return (
    <div className="SlideView5">
      <section className="slide-column-left">section .slide-column-left; text: {text}</section>
      <section className="slide-column-right">section .slide-column-right; codeText: {codeText}; RunKit: <Runkit codeText={codeText} /></section>
    </div>
  );
}

SlideView5.propTypes = {
  singleSlide: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    template: PropTypes.string,
    codeText: PropTypes.string,
    positionInDeck: PropTypes.number,
    speakerNotes: PropTypes.string,
  }),
};

SlideView5.defaultProps = {
  singleSlide: {
    id: 1,
    title: 'This is a slide title',
    text: '# Slide text\nThis is the text of a slide, which is in Markdown.!%%%!It has two columns, separated by an unlikely sequence of punctuation marks.',
    template: 'repl',
    codeText: 'let foo = 6; let bar = 7; let baz = foo + bar; baz();',
    positionInDeck: 1,
    speakerNotes: 'This is a speaker note in Markdown.',
  },
};
