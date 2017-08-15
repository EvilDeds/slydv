import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideView2() {
  // single pane
  return (
    <div>
      <div id="main">
        <section className="
          slide-default-text
          slide-single-pane"
        >section .slide-single-pane</section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
      <footer>footer <Link to="/slidesample1">Prev</Link> <Link to="/slidesample3">Next</Link></footer>
    </div>
  );
}
