import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SlideSample1 extends Component {
    constructor(){
        super();
    }


// Render editor
    render(){
        return(
            <div>
                <header>header for Title Field or Site Header</header>
                <div id='main'>
                    <section>section BLURB</section>
                    <section>section CODE PANE</section>
                </div>
                <footer>footer <Link to="/slidesample">Prev</Link> <Link to="/slidesample1">Next</Link></footer>
            </div>
        )
    }
}
