import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;

    return (
      <>
        <span data-testid="email-field">
          <strong>{email}</strong>
        </span>

        <span data-testid="total-field">{ 0 }</span>

        <span data-testid="header-currency-field">
          <strong>BRL</strong>
        </span>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
