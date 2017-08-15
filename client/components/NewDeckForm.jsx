import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

export default class NewDeckForm extends Component {
  constructor(){
    super();
    this.state = {
      newDeck : {
        userId : "", //should this be a setter method?  
        deckTitle : "", 
        viewable : false, 
        chats : ""
      }
    }
    this.handleChange  = this.handleChange.bind(this);
    this.handleSubmit = this. handleSubmit.bind(this);
  }
  handleChange(e){
   this.setState({
    newDeck : Object.assign({}, this.state.newDeck, { [e.target.name] : e.target.value })
  })
 }
   handleSubmit(){
    //thunk things 
    console.log('state to submit' , this.state.newDeck);
   }
   render(){
    return (
     <div className="NewDeckForm" onChange={ this.handleChange }>
     Is there anything more beautiful than a fresh deck? 
      <form  className="form-horizontal">
        <label className="control-label">Deck Title</label>
        <textarea name="deckTitle"/>
        <label className="control-label">Viewable:</label>     
        <input type="radio" name="viewable" value="true" />Yes
        <input type="radio" name="viewable" value="false" />No
      </form>
      <button type="submit" onClick={ this.handleSubmit }>Save & Start Your Deck</button>
     </div>
      )
   }
}
