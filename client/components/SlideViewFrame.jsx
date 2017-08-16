import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  SlideView1,
  SlideView2,
  SlideView3,
  SlideView4,
  SlideView5,
} from '../components';

export default function SlideViewFrame(props) {
// props include `singleSlide`, `hasFooter`, and `footer` (the latter two come from the slide’s parent deck).
  // const singleSlide = {
  //   id: 1,
  //   title: "This is a slide title",
  //   text: "# Slide text\n\nThis is the text of a slide, which is in Markdown.",
  //   template: "single-pane",
  //   codeText: null,
  //   positionInDeck: 1,
  // };

  // const footer = "Glorious Presentation by Footer McFootery\n[fmcfootery@mcfootery.com](fmcfootery@mcfootery.com)";

  // Give incoming props less wieldy names
  const { id, title, text, template, codeText, positionInDeck } = props.singleSlide;
  const { hasFooter, footer } = props.currentDeck;

  const slideBody = template => {
    switch (template) {
      case 'mid-page':
        return <slideView1 singleSlide={singleSlide} />;
        break;
      case 'single-pane':
        return <slideView2 singleSlide={singleSlide} />;
        break;
      case 'columns':
        return <slideView3 singleSlide={singleSlide} />;
        break;
      case 'columns-header':
        return <slideView4 singleSlide={singleSlide} />;
        break;
      case 'repl':
        return <slideView5 singleSlide={singleSlide} />;
        break;
      default:
        return;
    };
  }

  return (
    <div class="SlideViewFrame">
      { template === "columns-header" || template === "repl" ? <header>{title}</header> : null }
      {slideBody}
      { hasFooter && footer ? <footer>{footer}</footer> : null }
      {/* Slide numbers and next/previous links should maybe be handled
        in a separate component. I don't think they should be optional,
        but they _could_ be… */}
    </div>
  );
}
