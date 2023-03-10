export const USER_DATA = 'USER_DATA';
export const WALLET_DATA = 'WALLET_DATA';
export const ENDPOINT_API = 'https://economia.awesomeapi.com.br/json/all';

export const addEmailAction = (userData) => ({
  type: USER_DATA,
  payload: userData,
});

export const addCurrenciesAction = (walletData) => ({
  type: WALLET_DATA,
  payload: walletData,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch(ENDPOINT_API);
  const data = await response.json();

  const dataKeys = Object.keys(data);
  const indexUSDT = dataKeys.indexOf('USDT');
  dataKeys.splice(indexUSDT, 1);
  dispatch(currencyAction(dataKeys));
};
