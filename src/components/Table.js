import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  deleteExpenseAction,
  editExpenseAction,
} from '../redux/actions';

class Table extends Component {
  handleEditExpense = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(editExpenseAction(expenseId));
  };

  render() {
    const { expenses, dispatch } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {
            expenses && expenses.map((item) => (
              <tr key={ `${item.description}-${item.id}` }>
                <td>
                  {item.description}
                </td>
                <td>
                  {item.tag}
                </td>
                <td>
                  {item.method}
                </td>
                <td>
                  {Number(item.value).toFixed(2)}
                </td>
                <td>
                  {item.exchangeRates[item.currency].name}
                </td>
                <td>
                  {Number(item.exchangeRates[item.currency].ask).toFixed(2)}
                </td>
                <td>
                  {Number(item.value * item.exchangeRates[item.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditExpense(item.id) }
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="submit"
                    onClick={ () => dispatch(deleteExpenseAction(item.id)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Table);
