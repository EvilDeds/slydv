// This is a dumb form component, meant to be called by a higher-order component
// that will supply a handleSubmit and, if the form is being used to edit an
// existing record, that record's previous values.

import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

/* -------------- COMPONENT -------------- */

const ReplSlideForm = (props) => {
  // console.log('form props: ', props);
  const { error, formReplSlide, handleChange, handleSubmit } = props;

  return (
    <div className="ReplSlideForm col-lg-9 offset-lg-3">
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="slideTitle">* Slide title</label>
          <div className="col-md-5">
            <input
              id="slideTitle"
              name="slideTitle"
              type="text"
              className="form-control input-md"
              value={formReplSlide.slideTitle}
            />
            <span className="help-block">A slide title is optional</span>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="initialCode">Initial code</label>
          <div className="col-md-4">
            <AceEditor
              mode="javascript"
              theme="github"
              handleChange={handleChange}
              name="CodePane"
              editorProps={{ $blockScrolling: true }}
              value={formReplSlide.initialCode}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="speakerNotes">Speaker Notes</label>
          <div className="col-md-4">
            <textarea
              className="form-control"
              id="speakerNotes"
              name="speakerNotes"
              value={formReplSlide.speakerNotes}
            />
          </div>
        </div>

        <div className="form-group">
          <label
            className="col-md-4 control-label"
            htmlFor="SaveAndNew"
            type="submit"
          >Save + New</label>
          <div className="col-md-8">
            <button
              id="SaveAndNew"
              name="SaveAndNew"
              className="btn btn-success"
            >Save + New</button>
            <button
              id="ClearForm"
              name="ClearForm"
              className="btn btn-danger"
            >Clear Form</button>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="textify">Textify</label>
          <div className="col-md-4">
            <button id="textify" name="textify" className="btn btn-primary">Textify</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReplSlideForm;

ReplSlideForm.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    name: PropTypes.string,
  }),
  formReplSlide: PropTypes.shape({
    slideTitle: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

ReplSlideForm.defaultProps = {
  error: {
    message: '',
    name: '',
  },
};
