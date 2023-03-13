import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addExpenseAction, addTableAction, ENDPOINT_API, fetchCurrencies,
} from '../redux/actions';

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

  componentDidUpdate(prevProps) {
    const { isEditing } = this.props;

    if (prevProps.isEditing !== isEditing) {
      this.handleEditForm();
    }
  }

  handleEditForm = () => {
    const { isEditing, expensesData, expenseId } = this.props;
    const expenseEdit = expensesData.find((item) => item.id === expenseId);
    console.log(expenseEdit);

    if (isEditing) {
      this.setState({
        value: expenseEdit.value,
        description: expenseEdit.description,
        currency: expenseEdit.currency,
        method: expenseEdit.method,
        tag: expenseEdit.tag,
        exchangeRates: expenseEdit.exchangeRates,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const { isEditing, expensesData, expenseId } = this.props;
    const expenseEdit = expensesData.find((item) => item.id === expenseId);

    if (isEditing) {
      this.setState({
        value: expenseEdit.value,
        description: expenseEdit.description,
        currency: expenseEdit.currency,
        method: expenseEdit.method,
        tag: expenseEdit.tag,
        exchangeRates: expenseEdit.exchangeRates,
      });
    }

    this.setState({ [name]: value });
  };

  handleClearState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleSubmit = async (event) => {
    const { dispatch, expensesData, expenseId, isEditing } = this.props;
    event.preventDefault();
    console.log({ expenseId });

    if (isEditing) {
      // const filteredData = expensesData.filter((expense) => expense.id !== expenseId);
      const newArray = [...expensesData];
      const expense = { ...this.state };
      expense.id = expenseId;
      newArray[expenseId] = expense;
      dispatch(addTableAction(newArray));
      this.handleClearState();
      return;
    }

    const currencyResponse = await fetch(ENDPOINT_API);
    const data = await currencyResponse.json();
    console.log(data);

    this.setState({ exchangeRates: data }, () => {
      dispatch(addExpenseAction(this.state));
      this.handleClearState();
    });
  };

  render() {
    const { id, value, description, currency, method, tag } = this.state;
    const { currenciesData, isEditing } = this.props;

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
          {
            !isEditing ? 'Adicionar despesa' : 'Editar despesa'
          }
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesData: state.wallet.currencies,
  expensesData: state.wallet.expenses,
  isEditing: state.wallet.editor,
  expenseId: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currenciesData: PropTypes.instanceOf(Array).isRequired,
  expensesData: PropTypes.instanceOf(Array).isRequired,
  isEditing: PropTypes.bool.isRequired,
  expenseId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
