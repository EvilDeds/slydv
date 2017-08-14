import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SlideSample1 extends Component {
  // mid-page pane
  render() {
    return (
      <div>
        <div id="main">
          <section className="mid">section</section>
          <aside>aside for Optional Speaker Notes</aside>
        </div>
        <footer>footer <Link to="/slidesample">Prev</Link> <Link to="/slidesample2">Next</Link></footer>
      </div>
    );
  }
}
