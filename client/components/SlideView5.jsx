import PropTypes from 'prop-types';
import React from 'react';
import { Runkit } from './index';
import { MarkdownSection } from './Markdown';

// template === 'repl'
export default function SlideView5(props) {
  const { firstText, codeText } = props.singleSlide;

  return (
    <div className="SlideView5">
      <MarkdownSection className="slide-column-left" markdown={firstText} />
      <section className="slide-column-right">
        <div className="runkit-container"><Runkit codeText={codeText} /></div>
      </section>
    </div>
  );
}

/* -------------- PROP TYPES -------------- */

SlideView5.propTypes = {
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

SlideView5.defaultProps = {
  singleSlide: {
    id: 1,
    title: '',
    firstText: '',
    secondText: '',
    template: '',
    codeText: '',
    positionInDeck: 1,
    speakerNotes: '',
  },
};
