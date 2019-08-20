import React from 'react';
import PropTypes from 'prop-types';

import './AuthCenter.styl';

function AuthCenter({ children }) {
    return <div className="auth-center">{children}</div>;
}

AuthCenter.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthCenter;
