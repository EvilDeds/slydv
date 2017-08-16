import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideView() {
  // master layout
  return (
    <div>
      <header>header for Title Field or Site Header</header>
      <div id="main">
        <nav>nav for Sidebar in Edit Mode</nav>
        <section>section</section>
        <section>section</section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
      <footer>footer <Link to="/slideview1">Next</Link></footer>
    </div>
  );
}
