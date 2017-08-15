// This component wraps each SlideView, including the deck-wide theme
// and footer, if the user opts to have one.
import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import SlideView1 from '.SlideView1';
import SlideView2 from '.SlideView2';
import SlideView3 from '.SlideView3';
import SlideView4 from '.SlideView4';
import SlideView5 from '.SlideView5';

export default function SlideViewFrame(props) {
  return (
    <div class="SlideViewFrame">
      <div id="main">
        <nav>nav for Sidebar in Edit Mode</nav>
        {/* Specific slide view goes here */}
        <aside>aside for Optional Speaker Notes</aside>
      </div>
        {/* Footer should be conditional: deck.hasFooter === true */}
        <footer>footer <Link to="/slidesample1">Next</Link></footer>
    </div>
  );
}

// SlideViewFrame.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       slideId: PropTypes.number,
//     }),
//   }).isRequired,
//   singleSlide: PropTypes.shape({
//     title: PropTypes.string,
//     text: PropTypes.string,
//     isRepl: PropTypes.boolean,
//     codeText: PropTypes.string,
//     isHead: PropTypes.boolean,
//     nextId: PropTypes.string,
//     prevId: PropTypes.string,
//   }),
// };
