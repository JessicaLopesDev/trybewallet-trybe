export const USER_DATA = 'USER_DATA';
export const CURRENCY_DATA = 'CURRENCY_DATA';
export const EXPENSE_DATA = 'EXPENSE_DATA';
export const ENDPOINT_API = 'https://economia.awesomeapi.com.br/json/all';

export const addEmailAction = (userData) => ({
  type: USER_DATA,
  payload: userData,
});

export const addCurrenciesAction = (currencyData) => ({
  type: CURRENCY_DATA,
  payload: currencyData,
});

export const addCurrencyAction = (expenseData) => ({
  type: EXPENSE_DATA,
  payload: expenseData,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch(ENDPOINT_API);
  const data = await response.json();

  const dataKeys = Object.keys(data);
  const filteredDataKeys = dataKeys.filter((item) => item !== 'USDT');

  dispatch(addCurrenciesAction(filteredDataKeys));
};
