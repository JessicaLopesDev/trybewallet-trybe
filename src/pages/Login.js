import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addEmailAction } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (target) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  render() {
    const { history, dispatch } = this.props;
    const { email, password } = this.state;
    const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const minCharacter = 6;
    const isBtnDisable = password.length >= minCharacter && emailValidation.test(email);

    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          dispatch(addEmailAction({ email }));
          history.push('/carteira');
        } }
      >
        <input
          type="email"
          data-testid="email-input"
          placeholder="Digite seu e-mail aqui"
          value={ email }
          name="email"
          onChange={ ({ target }) => this.handleChange(target) }
        />

        <input
          type="password"
          data-testid="password-input"
          placeholder="Digite sua senha aqui"
          minLength={ 6 }
          value={ password }
          name="password"
          onChange={ ({ target }) => this.handleChange(target) }
        />

        <button
          type="submit"
          disabled={ !isBtnDisable }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Login);
