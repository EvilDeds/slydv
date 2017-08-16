import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import {
  SlideView1,
  SlideView2,
  SlideView3,
  SlideView4,
  SlideView5,
} from './index';

export default function SlideViewFrame(props) {
  // props will include `singleSlide`, `hasFooter`, and `footer`
  // (the latter two come from the slide’s parent deck).

  // Give incoming props less wieldy names
  const { title, template } = props.singleSlide;
  const { hasFooter, footer } = props.currentDeck;

  const slideBody = (thisTemplate) => {
    switch (thisTemplate) {
      case 'mid-page':
        return <SlideView1 singleSlide={props.singleSlide} />;
      case 'single-pane':
        return <SlideView2 singleSlide={props.singleSlide} />;
      case 'columns':
        return <SlideView3 singleSlide={props.singleSlide} />;
      case 'columns-header':
        return <SlideView4 singleSlide={props.singleSlide} />;
      case 'repl':
        return <SlideView5 singleSlide={props.singleSlide} />;
      default:
        return null;
    }
  };

  return (
    <div className="SlideViewFrame">
      { template === 'columns-header' || template === 'repl' ? <header>{title}</header> : null }
      {slideBody(template)}
      { hasFooter && footer ? <footer>{footer}</footer> : null }
      {/* Slide numbers and next/previous links should maybe be handled
        in a separate component. I don't think they should be optional,
        but they _could_ be… */}
    </div>
  );
}

SlideViewFrame.propTypes = {
  singleSlide: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    template: PropTypes.string,
    codeText: PropTypes.string,
    positionInDeck: PropTypes.number,
  }),
  currentDeck: PropTypes.shape({
    id: PropTypes.number,
    deckTitle: PropTypes.string,
    viewable: PropTypes.boolean,
    chats: PropTypes.string,
    theme: PropTypes.string,
    hasFooter: PropTypes.boolean,
    footer: PropTypes.string,
  }),
};

SlideViewFrame.defaultProps = {
  singleSlide: {
    id: 1,
    title: 'This is a slide title',
    text: '# Slide text\nThis is the text of a slide, which is in Markdown.',
    template: 'single-pane',
    // template: 'columns-header',
    codeText: null,
    positionInDeck: 1,
  },
  currentDeck: {
    id: 1,
    deckTitle: 'Test Deck',
    viewable: true,
    chats: '',
    theme: 'red',
    hasFooter: true,
    footer: 'Glorious Presentation by Footer McFootery\n[fmcfootery@mcfootery.com](fmcfootery@mcfootery.com)',
  },
};
