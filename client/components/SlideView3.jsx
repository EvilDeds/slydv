import React from 'react';
import PropTypes from 'prop-types';

// template === 'columns-header'
export default function SlideView3(props) {
  const { text } = props.singleSlide;
  const [text1, text2] = text.split('!%%%!');

  return (
    <div className="columns-header">
      <section className="slide-column-left">section .slide-column-left; text1: {text1}</section>
      <section className="slide-column-right">section .slide-column-right; text2: {text2}</section>
    </div>
  );
}

SlideView3.propTypes = {
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

SlideView3.defaultProps = {
  singleSlide: {
    id: 1,
    title: 'This is a slide title',
    text: '# Slide text\nThis is the text of a slide, which is in Markdown.!%%%!It has two columns, separated by an unlikely sequence of punctuation marks.',
    template: 'columns-header',
    codeText: null,
    positionInDeck: 1,
    speakerNotes: 'This is a speaker note in Markdown.',
  },
};
