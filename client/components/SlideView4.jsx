import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideView4() {
  // no header + 2 panes
  return (
    <div>
      <div id="main">
        <section>section</section>
        <section>section</section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
      <footer>footer <Link to="/slideview3">Prev</Link> <Link to="/slideview5">Next</Link></footer>
    </div>
  );
}
