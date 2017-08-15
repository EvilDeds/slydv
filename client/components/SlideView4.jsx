import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideView4() {
  // no header + 2 panes
  return (
    <div>
      <div id="main">
        <section className="
          slide-default-text
          slide-column
          slide-column-left"
        >section .slide-column .slide-column-left</section>
        <section className="
          slide-column
          slide-column-right"
        >section .slide-column .slide-column-right</section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
      <footer>footer <Link to="/slidesample3">Prev</Link> <Link to="/slidesample5">Next</Link></footer>
    </div>
  );
}
