export const USER_DATA = 'USER_DATA';
export const CURRENCY_DATA = 'CURRENCY_DATA';
export const EXPENSE_DATA = 'EXPENSE_DATA';
export const EXPENSE_DELETE = 'EXPENSE_DELETE';
export const EXPENSE_EDIT = 'EXPENSE_EDIT';
export const EXPENSES = 'EXPENSES';
export const ENDPOINT_API = 'https://economia.awesomeapi.com.br/json/all';

export const addEmailAction = (userData) => ({
  type: USER_DATA,
  payload: userData,
});

export const addCurrencyAction = (currencyData) => ({
  type: CURRENCY_DATA,
  payload: currencyData,
});

export const addExpenseAction = (expenseData) => ({
  type: EXPENSE_DATA,
  payload: expenseData,
});

export const deleteExpenseAction = (expenseId) => ({
  type: EXPENSE_DELETE,
  payload: expenseId,
});

export const editExpenseAction = (expenseId) => ({
  type: EXPENSE_EDIT,
  payload: expenseId,
});

export const addTableAction = (expenses) => ({
  type: EXPENSES,
  payload: expenses,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch(ENDPOINT_API);
  const data = await response.json();

  const dataKeys = Object.keys(data);
  const filteredDataKeys = dataKeys.filter((item) => item !== 'USDT');

  dispatch(addCurrencyAction(filteredDataKeys));
};
