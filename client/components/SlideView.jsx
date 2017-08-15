import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideView() {
  // master layout
  return (
    <div>
      <header>header for Title Field or Site Header</header>
      <div id="main">
        <nav>nav for Sidebar in Edit Mode</nav>
        <section className="
          slide-default-text
          slide-column
          slide-column-left"
        >section .slide-default-text .slide-column .slide-column-left</section>
        <section className="
          slide-column
          slide-column-right"
        >section .slide-column .slide-column-right</section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
      <footer>footer <Link to="/slidesample1">Next</Link></footer>
    </div>
  );
}
