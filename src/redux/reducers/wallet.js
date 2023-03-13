import {
  CURRENCY_DATA,
  EXPENSE_DATA,
  EXPENSE_DELETE,
  EXPENSE_EDIT,
  EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  console.log({ action: action.payload });
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
  case EXPENSE_EDIT: return {
    ...state,
    editor: true,
    idToEdit: action.payload,
  };
  case EXPENSES: return {
    ...state,
    expenses: [...action.payload],
    editor: false,
  };
  default: return state;
  }
};

export default wallet;
