import PropTypes from 'prop-types';
import React from 'react';
import { MarkdownSection } from './Markdown';

// template === 'single-pane'
export default function SlideView2(props) {
  const { firstText } = props.singleSlide;

  return (
    <div className="single-pane">
      <MarkdownSection markdown={firstText} />
    </div>
  );
}

SlideView2.propTypes = {
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

SlideView2.defaultProps = {
  singleSlide: {
    id: 1,
    title: 'This is a slide title',
    firstText: '# Slide text\nThis is the text of a slide, which is in Markdown.',
    template: 'single-pane',
    codeText: null,
    positionInDeck: 1,
    speakerNotes: 'This is a speaker note in Markdown.',
  },
};
