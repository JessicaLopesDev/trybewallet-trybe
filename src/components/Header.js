import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  handleExpenseTotal = () => {
    const { expenses } = this.props;
    let total = 0;

    expenses.forEach((item) => {
      const sum = item.value * item.exchangeRates[item.currency].ask;
      total += sum;
    });

    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;

    return (
      <>
        <span data-testid="email-field">
          <strong>{email}</strong>
        </span>

        <span data-testid="total-field">{ this.handleExpenseTotal() }</span>

        <span data-testid="header-currency-field">
          <strong>BRL</strong>
        </span>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
