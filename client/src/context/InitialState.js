export const INITIAL_STATE = {
  user: localStorage.getItem('user') || null,
  token: '',
  isFetching: false,
  error: false,
};
