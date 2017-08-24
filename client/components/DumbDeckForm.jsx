import PropTypes from 'prop-types';
import React from 'react';

export default function DumbDeckForm(props) {
  return (
    <div className="dumb-deck-form">
      <form className="form-horizontal">

        {/* deck title --------------------------------------------*/}
        <div className="dqpl-field-wrap">
          <label className="control-label" htmlFor="deckTitle" id="deckTitleLabel">Deck Title</label>
          <input className="dqpl-text-input" type="text" name="deckTitle" aria-labelledby="deckTitleLabel" value={props.deck.deckTitle} onChange={props.handleChange} />
        </div>

        {/* deck theme --------------------------------------------*/}
        <div className="dqpl-field-wrap">
          <label htmlFor="theme" id="themeLabel">Choose a Deck Theme</label>
          <div className="dqpl-select">
            <select name="theme" aria-labelledby="themeLabel" value={props.deck.theme} onChange={props.handleChange}>
              <option value="antique">Antique</option>
              <option value="swiss">Swiss</option>
              <option value="ulysses">Ulysses</option>
            </select>
          </div>
        </div>

        {/* deck has a footer? ------------------------------------*/}
        <div className="actual-radio-group" role="radiogroup" aria-labelledby="hasFooterLabel">
          <label className="control-label" id="hasFooterLabel" htmlFor="hasFooter">Should this deck have a footer?</label>
          <input type="radio" aria-labelledby="hasFooterLabel" name="hasFooter" value="true" checked={props.deck.hasFooter === true} onChange={props.handleRadioChange} /><span className="radio-label-inline">Yes</span>
          <input type="radio" aria-labelledby="hasFooterLabel" name="hasFooter" value="false" checked={props.deck.hasFooter === false} onChange={props.handleRadioChange} /><span className="radio-label-inline">No</span>
        </div>

        {/* if hasFooter, what goes in it? - conditional ----------*/}
        { props.deck.hasFooter && (
          <div className="dqpl-field-wrap">
            <label className="control-label" htmlFor="footerText" id="footerTextLabel">Footer Text</label>
            <input className="dqpl-text-input" type="text" name="footerText" aria-labelledby="footerTextLabel" value={props.deck.footerText} onChange={props.handleChange} />
          </div>
        )}

        {/* deck is viewable? -------------------------------------*/}
        <div className="actual-radio-group" role="radiogroup" aria-labelledby="hasFooterLabel">
          <label className="control-label" id="viewableLabel" htmlFor="viewable">Should this deck be publicly viewable?</label>
          <input type="radio" aria-labelledby="viewableLabel" name="viewable" value="true" checked={props.deck.viewable === true} onChange={props.handleRadioChange} /><span className="radio-label-inline">Yes</span>
          <input type="radio" aria-labelledby="viewableLabel" name="viewable" value="false" checked={props.deck.viewable === false} onChange={props.handleRadioChange} /><span className="radio-label-inline">No</span>
        </div>
        <hr />

        {/* save deck and edit the first slide --------------------*/}
        <button className="dqpl-button-primary" type="button" onClick={props.handleSubmit}>{props.submitLabel}</button>
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
