import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideView2() {
  // single pane
  return (
    <div>
      <div id="main">
        <section>section BLURB</section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
      <footer>footer <Link to="/slideview1">Prev</Link> <Link to="/slideview3">Next</Link></footer>
    </div>
  );
}
