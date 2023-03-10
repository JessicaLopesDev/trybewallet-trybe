export const USER_DATA = 'USER_DATA';
export const WALLET_DATA = 'WALLET_DATA';

export const addEmailAction = (userData) => ({
  type: USER_DATA,
  payload: userData,
});

export const addCurrenciesAction = (walletData) => ({
  type: WALLET_DATA,
  payload: walletData,
});
