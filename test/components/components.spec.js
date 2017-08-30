import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';



import { DeckOverview, ChatBox, Landing, EditDeckForm } from '../../client/components'; 





describe('React Components', () => {
 
  beforeEach('make global window', () => {
   global.window = {document: {querySelector: function () { return null; }}}
  })

  describe('<DeckOverview /> component', () => {
  	it ('renders without a problem', () => {
  	  const decky = shallow(<DeckOverview/>);
  	  expect(decky).to.have.length(1);
  	})
  })

  describe('<ChatBox /> component', () => {
     it ('does not explode when rendering', () => {
       const chatty = shallow(<ChatBox/>);
  	   expect(chatty).to.have.length(1);
     })
  })

  describe('<Landing /> component', () => {
     it ('renders on command', () => {
       const lander = shallow(<Landing/>);
  	   expect(lander).to.have.length(1);
     })
  })

  describe('<EditDeckForm /> component', () => {
     it ('renders a deck editing form', () => {
       const deckEdit = shallow(<EditDeckForm/>);
  	   expect(deckEdit).to.have.length(1);
     })
  })




})


