import PropTypes from 'prop-types';
import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';

/* -------------- COMPONENT -------------- */

export const UserHome = (props) => {
  const { email } = props;

  return (
    <DocumentTitle title="Home | SlyDv">
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    </DocumentTitle>
  );
};

/* -------------- CONTAINER -------------- */

const mapState = state => ({
  email: state.user.email,
});

export default connect(mapState)(UserHome);

/* -------------- PROP TYPES -------------- */

UserHome.propTypes = {
  email: PropTypes.string,
};

UserHome.defaultProps = {
  email: '',
};
