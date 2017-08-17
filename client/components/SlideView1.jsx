import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownSection } from './Markdown';

// template === 'mid-page'
export default function SlideView1(props) {
  const { text } = props.singleSlide;

  return (
    <MarkdownSection className="mid-page" markdown={text} />
  );
}

SlideView1.propTypes = {
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

SlideView1.defaultProps = {
  singleSlide: {
    id: 1,
    title: 'This is a slide title',
    text: '# Slide text\nThis is the text of a slide, which is in Markdown.',
    template: 'mid-page',
    codeText: null,
    positionInDeck: 1,
    speakerNotes: 'This is a speaker note in Markdown.',
  },
};
