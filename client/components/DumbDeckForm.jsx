import PropTypes from 'prop-types';
import React from 'react';

/* -------------- COMPONENT -------------- */

export default function DumbDeckForm(props) {
  return (
    <div className="dumb-deck-form">
      <form className="form-horizontal">

        {/* deck title ------------------------------------------*/}
        <div className="dqpl-field-wrap">
          <label className="control-label" htmlFor="deckTitle" id="deckTitleLabel">Deck Title</label>
          <input aria-labelledby="deckTitleLabel" className="dqpl-text-input" name="deckTitle" onChange={props.handleChange} type="text" value={props.deck.deckTitle} />
        </div>

        {/* deck theme ------------------------------------------*/}
        <div className="dqpl-field-wrap">
          <label htmlFor="theme" id="themeLabel">Choose a Deck Theme</label>
          <div className="dqpl-select">
            <select aria-labelledby="themeLabel" name="theme" onChange={props.handleChange} value={props.deck.theme}>
              <option value="antique">Antique</option>
              <option value="swiss">Swiss</option>
              <option value="ulysses">Ulysses</option>
            </select>
          </div>
        </div>

        {/* deck has a footer? ----------------------------------*/}
        <div aria-labelledby="hasFooterLabel" className="actual-radio-group" role="radiogroup">
          <label className="control-label" htmlFor="hasFooter" id="hasFooterLabel">Should this deck have a footer?</label>
          <input aria-labelledby="hasFooterLabel" checked={props.deck.hasFooter === true} name="hasFooter" onChange={props.handleRadioChange} type="radio" value="true" /><span className="radio-label-inline">Yes</span>
          <input aria-labelledby="hasFooterLabel" checked={props.deck.hasFooter === false} name="hasFooter" onChange={props.handleRadioChange} type="radio" value="false" /><span className="radio-label-inline">No</span>
        </div>

        {/* if hasFooter, what goes in it? - conditional --------*/}
        { props.deck.hasFooter && (
          <div className="dqpl-field-wrap">
            <label className="control-label" htmlFor="footerText" id="footerTextLabel">Footer Text</label>
            <input aria-labelledby="footerTextLabel" className="dqpl-text-input" name="footerText" onChange={props.handleChange} type="text" value={props.deck.footerText} />
          </div>
        )}

        {/* deck is viewable? -----------------------------------*/}
        <div aria-labelledby="hasFooterLabel" className="actual-radio-group" role="radiogroup">
          <label className="control-label" htmlFor="viewable" id="viewableLabel">Should this deck be publicly viewable?</label>
          <input aria-labelledby="viewableLabel" checked={props.deck.viewable === true} name="viewable" onChange={props.handleRadioChange} type="radio" value="true" /><span className="radio-label-inline">Yes</span>
          <input aria-labelledby="viewableLabel" checked={props.deck.viewable === false} name="viewable" onChange={props.handleRadioChange} type="radio" value="false" /><span className="radio-label-inline">No</span>
        </div>
        <hr />

        {/* save deck and edit the first slide ------------------*/}
        <button className="dqpl-button-primary" onClick={props.handleSubmit} type="button">{props.submitLabel}</button>
      </form>
    </div>
  );
}

DumbDeckForm.propTypes = {
  deck: PropTypes.shape({
    deckTitle: PropTypes.string.isRequired,
    footerText: PropTypes.string,
    hasFooter: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
    viewable: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
};

DumbDeckForm.defaultProps = {
  deck: {
    deckTitle: '',
    footerText: '',
    hasFooter: false,
    theme: 'red',
    viewable: false,
  },
};
