import PropTypes from 'prop-types';
import React from 'react';
import { MarkdownSection } from './Markdown';

// template === 'columns-header'
export default function SlideView3(props) {
  const { firstText, secondText } = props.singleSlide;

  return (
    <div className="columns-header">
      <MarkdownSection className="slide-column-left" markdown={firstText} />
      <MarkdownSection className="slide-column-right" markdown={secondText} />
    </div>
  );
}

SlideView3.propTypes = {
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

SlideView3.defaultProps = {
  singleSlide: {
    id: 1,
    title: 'This is a slide title',
    firstText: '# Slide text\nThis is the text of a slide, which is in Markdown.!%%%!It has two columns, separated by an unlikely sequence of punctuation marks.',
    secondText: 'Dummy secondText',
    template: 'columns-header',
    codeText: null,
    positionInDeck: 1,
    speakerNotes: 'This is a speaker note in Markdown.',
  },
};
