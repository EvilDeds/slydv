//DELETE THIS FILE PROBABLY -- > 


// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import NewDeckForm from './NewDeckForm';

// import {/*THINGS*/} from '../store/'//new deck? 

// function NewDeckFormHO(Component, thunkCreator) {
//   return class extends React.Component {
//     constructor(props){
//   	  super(props);
//   	  this.state = {
//        newDeck : {
//        	userId : req.user.id, //should this be a setter method?  
//         deckTitle : "", 
//         viewable : false, 
//         chats : ""
//        }
//   		}
//   	  this.handleChange = this.handleChange.bind(this);
//   	  this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     handleChange(e){
//       this.setState({
//         newDeck : { [e.target.name : e.target.value]}
//       })
//     }

//     handleSubmit(){ //should be moved to a thunk?
//       // axios.post()
//     }
//     render(){
//     	<Component handleSubmit={ this.handleSubmit } handleChange={ this.handleChange } />
//     }
//   }
// }
