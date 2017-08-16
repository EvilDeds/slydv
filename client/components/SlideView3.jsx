import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideView3() {
  // header + 2 panes
  return (
    <div>
      <header>header for Title Field or Site Header</header>
      <div id="main">
        <section>section</section>
        <section>section</section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
      <footer>footer <Link to="/slideview2">Prev</Link> <Link to="/slideview4">Next</Link></footer>
    </div>
  );
}
