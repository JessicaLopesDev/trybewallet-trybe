import { WALLET_DATA } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_DATA: return {
    ...state,
    ...action.payload,
  };
  default: return state;
  }
};

export default wallet;
