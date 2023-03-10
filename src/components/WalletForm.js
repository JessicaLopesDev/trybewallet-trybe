import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
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
          <option>Real</option>
          <option>Dólar</option>
          <option>Euro</option>
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

export default WalletForm;
