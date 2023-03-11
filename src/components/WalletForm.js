import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currenciesData } = this.props;

    return (
      <form>
        <input
          type="number"
          placeholder="Valor"
          data-testid="value-input"
        />

        <input
          type="text"
          placeholder="Descrição"
          data-testid="description-input"
        />

        <select data-testid="currency-input">
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

        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select data-testid="tag-input">
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
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currenciesData: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
