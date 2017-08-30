import PropTypes from 'prop-types';
import React from 'react';
import { MarkdownSection } from './Markdown';

// template === 'columns'
export default function SlideView4(props) {
  const { firstText, secondText } = props.singleSlide;

  return (
    <div className="columns-header">
      <MarkdownSection className="slide-column-left" markdown={firstText} />
      <MarkdownSection className="slide-column-right" markdown={secondText} />
    </div>
  );
}

SlideView4.propTypes = {
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

SlideView4.defaultProps = {
  singleSlide: {
    id: 1,
    title: 'This is a slide title',
    firstText: '# Slide text\nThis is the text of a slide, which is in Markdown.!',
    secondText: 'It has two columns.',
    template: 'columns',
    codeText: null,
    positionInDeck: 1,
    speakerNotes: 'This is a speaker note in Markdown.',
  },
};
