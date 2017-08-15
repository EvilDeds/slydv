import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MarkdownHeader } from './Markdown';

export default class SlideSample extends Component {
  // master layout
  render() {
    return (
      <div>
        <MarkdownHeader markdown="for Title Field or Site Header" />
        <div id="main">
          <nav>nav for Sidebar in Edit Mode</nav>
          <section>section</section>
          <section>section</section>
          <aside>aside for Optional Speaker Notes</aside>
        </div>
        <footer>footer <Link to="/slidesample1">Next</Link></footer>
      </div>
    );
  }
}
