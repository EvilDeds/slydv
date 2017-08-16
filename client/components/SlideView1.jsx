import React from 'react';
import { Link } from 'react-router-dom';

export default function SlideView1() {
  // mid-page pane
  return (
    <div>
      <div id="main">
        <section className="mid">section</section>
        <aside>aside for Optional Speaker Notes</aside>
      </div>
      <footer>footer <Link to="/slideview">Prev</Link> <Link to="/slideview2">Next</Link></footer>
    </div>
  );
}
