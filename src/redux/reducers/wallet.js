import { CURRENCY_DATA, EXPENSE_DATA } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_DATA: return {
    ...state,
    currencies: action.payload,
  };
  case EXPENSE_DATA: return {
    ...state,
    expenses: action.payload,
  };
  default: return state;
  }
};

export default wallet;
