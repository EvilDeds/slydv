import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SlideSample extends Component {
    constructor(){
        super();
    }


// Render editor
    render(){
        return(
            <div>
                <header>header for Title Field or Site Header</header>
                <div id='main'>
                    <nav>nav for Sidebar in Edit Mode</nav>
                    <section>section</section>
                    <section>section</section>
                    <aside>aside for Optional Speaker Notes</aside>
                </div>
                <footer>footer <Link to="/slidesample1">Next</Link></footer>
            </div>
        )
    }
}
