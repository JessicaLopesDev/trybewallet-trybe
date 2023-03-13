import { CURRENCY_DATA, EXPENSE_DATA, EXPENSE_DELETE } from '../actions';

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
    expenses: [
      ...state.expenses,
      {
        id: state.expenses.length,
        ...action.payload,
      },
    ],
  };
  case EXPENSE_DELETE: return {
    ...state,
    expenses:
      state.expenses.filter((item) => item.id !== action.payload),
  };
  default: return state;
  }
};

export default wallet;
