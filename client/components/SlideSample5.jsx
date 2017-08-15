import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Runkit } from './index';

export default class SlideSample5 extends Component {
  // header + codepane
  render() {
    return (
      <div>
        <header>header for Title Field or Site Header</header>
        <div id="main">
          <section className="slide-column slide-column-left" id="repl-edit">section .slide-column .slide-column-left #repl-edit<Runkit /></section>
          <section className="slide-column slide-column-right" id="repl-result">section .slide-column .slide-column-right #repl-result</section>
          <aside>aside for Optional Speaker Notes</aside>
        </div>
        <footer>footer <Link to="/slidesample4">Prev</Link></footer>
      </div>
    );
  }
}
