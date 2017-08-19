import PropTypes from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { auth } from '../store';

/* -------------- COMPONENT -------------- */

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const pageTitle = `${displayName} | SlyDv`;
  return (
    <DocumentTitle className="AuthForm" title={pageTitle}>
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email" id="emailLabel"><small>Email</small></label>
            <input name="email" type="text" aria-labelledby="emailLabel" />
          </div>
          <div>
            <label htmlFor="password" id="passwordLabel"><small>Password</small></label>
            <input name="password" type="password" aria-labelledby="passwordLabel" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    </DocumentTitle>
  );
};

/* -------------- CONTAINER --------------
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => ({
  name: 'login',
  displayName: 'Log In',
  error: state.user.error,
});

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error,
});

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName));
  },
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/* -------------- PROP TYPES -------------- */

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    name: PropTypes.string,
  }),
};

AuthForm.defaultProps = {
  error: {},
};
