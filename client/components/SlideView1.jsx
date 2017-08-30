import PropTypes from 'prop-types';
import React from 'react';
import { MarkdownSection } from './Markdown';

// template === 'mid-page'
export default function SlideView1(props) {
  const { firstText } = props.singleSlide;

  return (
    <MarkdownSection className="mid-page" markdown={firstText} />
  );
}

SlideView1.propTypes = {
  singleSlide: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    firstText: PropTypes.string,
    secondText: PropTypes.string,
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
    firstText: '# Slide text\nThis is the text of a slide, which is in Markdown.',
    secondText: 'I should not show up as this slide should only have one column',
    template: 'mid-page',
    codeText: null,
    positionInDeck: 1,
    speakerNotes: 'This is a speaker note in Markdown.',
  },
};
