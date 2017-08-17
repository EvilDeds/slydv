import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownSection } from './Markdown';

// template === 'columns'
export default function SlideView4(props) {
  const { text } = props.singleSlide;
  const [text1, text2] = text.split('!%%%!');

  return (
    <div className="columns-header">
      <MarkdownSection className="slide-column-left" markdown={text1} />
      <MarkdownSection className="slide-column-right" markdown={text2} />
    </div>
  );
}

SlideView4.propTypes = {
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

SlideView4.defaultProps = {
  singleSlide: {
    id: 1,
    title: 'This is a slide title',
    text: '# Slide text\nThis is the text of a slide, which is in Markdown.!%%%!It has two columns, separated by an unlikely sequence of punctuation marks.',
    template: 'columns',
    codeText: null,
    positionInDeck: 1,
    speakerNotes: 'This is a speaker note in Markdown.',
  },
};
