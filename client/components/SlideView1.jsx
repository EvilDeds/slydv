import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default function SlideView1() {
  // mid-page pane
  return (
    <div>
      <div id="main">
        <section className="
          slide-default-text
          slide-mid-page
          slide-default-text"
        >section .slide-mid-page .slide-default-text</section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
    </div>
  );
}

// SlideView1.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       slideId: PropTypes.number,
//     }),
//   }).isRequired,
//   singleSlide: PropTypes.shape({
//     text: PropTypes.string,
//     isHead: PropTypes.boolean,
//     nextId: PropTypes.string,
//     prevId: PropTypes.string,
//   }),
// };
