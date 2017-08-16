import React from 'react';
import PropTypes from 'prop-types';

// template === 'single-pane'
export default function SlideView2(props) {
  const { text } = props.singleSlide;

  return (
    <div className="single-pane">
      <section>section .single-pane; text: {text}</section>
    </div>
  );
}

SlideView2.propTypes = {
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

SlideView2.defaultProps = {
  singleSlide: {
    id: 1,
    title: 'This is a slide title',
    text: '# Slide text\nThis is the text of a slide, which is in Markdown.',
    template: 'single-pane',
    codeText: null,
    positionInDeck: 1,
    speakerNotes: 'This is a speaker note in Markdown.',
  },
};
