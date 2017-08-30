import PropTypes from 'prop-types';
import React from 'react';
import {
  SlideView1,
  SlideView2,
  SlideView3,
  SlideView4,
  SlideView5,
} from './index';
import {
  MarkdownFooter,
  MarkdownHeader,
  MarkdownSpeakerNotes,
} from './Markdown';

/* -------------- COMPONENT -------------- */

export default function SlideViewFrame(props) {
  const { title, template, presenterNotes } = props.singleSlide;
  const { footerText, hasFooter} = props.currentDeck;

  const slideBody = (thisTemplate) => {
    switch (thisTemplate) {
      case 'mid-page':
        return <SlideView1 singleSlide={props.singleSlide} />;
      case 'single-pane':
        return <SlideView2 singleSlide={props.singleSlide} />;
      case 'columns-header':
        return <SlideView3 singleSlide={props.singleSlide} />;
      case 'columns':
        return <SlideView4 singleSlide={props.singleSlide} />;
      case 'repl':
        return <SlideView5 singleSlide={props.singleSlide} />;
      default:
        return null;
    }
  };

  return (
    <div id="main" className={`slide-view-frame ${props.currentDeck.theme}`}>
      <section className="slide-block">
        { template === 'columns-header' || template === 'repl' ? <h1><MarkdownHeader markdown={title} /></h1> : null }
        { slideBody(template) }
      </section>
      { props.presenterView && <MarkdownSpeakerNotes markdown={presenterNotes} /> }
    </div>
  );
}

/* -------------- PROP TYPES -------------- */

SlideViewFrame.propTypes = {
  singleSlide: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    firstText: PropTypes.string,
    secondText: PropTypes.string,
    template: PropTypes.string,
    codeText: PropTypes.string,
    positionInDeck: PropTypes.number,
    presenterNotes: PropTypes.string,
  }),
  currentDeck: PropTypes.shape({
    id: PropTypes.number,
    deckTitle: PropTypes.string,
    viewable: PropTypes.boolean,
    theme: PropTypes.string,
    hasFooter: PropTypes.boolean,
    footerText: PropTypes.string,
  }),
  presenterView: PropTypes.bool,
};

SlideViewFrame.defaultProps = {
  singleSlide: {
    id: 1,
    title: '',
    firstText: '',
    secondText: '',
    // template: 'mid-page',
    // template: 'single-pane',
    // template: 'columns-header',
    // template: 'columns',
    template: 'repl',
    codeText: '',
    positionInDeck: 1,
    presenterNotes: '',
  },
  currentDeck: {
    id: 1,
    deckTitle: '',
    viewable: true,
    theme: 'red',
    hasFooter: true,
    footerText: '',
  },
  presenterView: false,
};
