import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;

    return (
      <span data-testid="email-field">
        <strong>{ email }</strong>
      </span>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Header;
