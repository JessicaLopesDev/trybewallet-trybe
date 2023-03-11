import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';

describe('Testes App', () => {
  it('Testa a página de Login: Validação dos campos e redirecionamento para a página Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');

    const passwordInput = screen.getByPlaceholderText('Digite sua senha aqui');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'teste@email.com');
    userEvent.type(passwordInput, '1234567');
    expect(button).toBeEnabled();

    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
  });

  it('Testa se a página Wallet funciona como o esperado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });
    const button = screen.getByRole('button');
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const selectInputs = screen.queryAllByRole('combobox');

    expect(button).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(selectInputs).toHaveLength(3);
  });
});
