import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SlideSample2 extends Component {
    constructor(){
        super();
    }

    // single pane
    render(){
        return(
            <div>
                <div id='main'>
                    <section>section BLURB</section>
                    <aside>aside for Optional Speaker Notes</aside>
                </div>
                <footer>footer <Link to="/slidesample1">Prev</Link> <Link to="/slidesample3">Next</Link></footer>
            </div>
        )
    }
}
