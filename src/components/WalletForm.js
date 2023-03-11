import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addExpenseAction, ENDPOINT_API, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    const { dispatch, expensesData } = this.props;
    event.preventDefault();

    const currencyResponse = await fetch(ENDPOINT_API);
    const data = await currencyResponse.json();

    this.setState({ exchangeRates: data }, () => {
      dispatch(addExpenseAction(this.state));
    });

    console.log(expensesData);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { id, value, description, currency, method, tag } = this.state;
    const { currenciesData } = this.props;

    return (
      <form onSubmit={ this.handleSubmit } id={ id }>
        <input
          type="number"
          placeholder="Valor"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />

        <input
          type="text"
          placeholder="Descrição"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />

        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {
            // console.log(currenciesData)
            currenciesData.map((item, index) => (
              <option
                key={ index }
                value={ item }
              >
                { item }
              </option>
            ))
          }
        </select>

        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <button
          type="submit"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesData: state.wallet.currencies,
  expensesData: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currenciesData: PropTypes.instanceOf(Array).isRequired,
  expensesData: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
