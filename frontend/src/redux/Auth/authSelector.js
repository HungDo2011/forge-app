// Logged status
export const loggedSelector = (state) => state.auth.login.logged;

// Fetching Status

export const isFetchingSelector = (state) => state.auth.login.isFetching;

// UserInfo
export const userSelector = (state) => state.auth.login.currentUser;

// Messages

export const messSelector = (state) => state.auth.login.mess;
