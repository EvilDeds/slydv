import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SlideSample3 extends Component {
  // header + 2 panes
  render() {
    return (
      <div>
        <header>header for Title Field or Site Header</header>
        <div id='main'>
          <section>section</section>
          <section>section</section>
          <aside>aside for Optional Speaker Notes</aside>
        </div>
        <footer>footer <Link to="/slidesample2">Prev</Link> <Link to="/slidesample4">Next</Link></footer>
      </div>
    );
  }
}
