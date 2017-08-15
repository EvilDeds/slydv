import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideView3() {
  // header + 2 panes
  return (
    <div>
      <header>header for Title Field or Site Header</header>
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
      <footer>footer <Link to="/slidesample2">Prev</Link> <Link to="/slidesample4">Next</Link></footer>
    </div>
  );
}
