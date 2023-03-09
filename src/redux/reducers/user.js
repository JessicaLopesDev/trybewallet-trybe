import { USER_DATA } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_DATA: return {
    ...state.user,
    ...action.payload,
  };
  default: return state;
  }
};

export default userReducer;
