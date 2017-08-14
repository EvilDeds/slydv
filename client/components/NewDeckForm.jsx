import React from 'react';
import PropTypes from 'prop-types';

import 'brace/mode/javascript';
import 'brace/theme/github';

const NewDeckForm = (props) => {
  //const for receiving props 
  const { handleChange, handleSubmit, } = props;
  return (
    <div className="NewDeckForm">
      <form  className="form-horizontal">
        <label className="control-label">Deck Title</label>
        <textarea />
        <label className="control-label">Viewable:</label>     
        <input type="radio" name="viewable" value="true"> Yes
        <input type="radio" name="viewable" value="false"> No
      </form>
    </div>
  )
}