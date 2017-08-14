import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SlideSample4 extends Component {
    constructor(){
        super();
    }

    // no header + 2 panes
    render(){
        return(
            <div>
                <div id='main'>
                    <section>section</section>
                    <section>section</section>
                    <aside>aside for Optional Speaker Notes</aside>
                </div>
                <footer>footer <Link to="/slidesample3">Prev</Link> <Link to="/slidesample5">Next</Link></footer>
            </div>
        )
    }
}
