import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';

//mocking a browser so that the socket.io functionality does not throw errors has been a challenge

let DeckOverview;
let ChatBox;
let Landing;
let EditDeckForm;

if(!global.window){
  const MockBrowser = require('mock-browser').mocks.MockBrowser
  global.window = new MockBrowser().getWindow();
   DeckOverview = require('../../client/components/DeckOverview').default
   ChatBox = require('../../client/components/ChatBox').default
   Landing = require('../../client/components/Landing').default
   EditDeckForm = require('../../client/components/EditDeckForm').default
}

describe('React Components', () => {

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


