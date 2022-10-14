const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            mess: null,
        },
        register: {},
    },
    reducers: {
        loginStart(state) {
            state.login.isFetching = true;
        },
        loginSuccess(state, action) {
            const { token, ...user } = action.payload;
            state.login.currentUser = { ...user };
            state.login.isFetching = false;

            localStorage.setItem('token', token.access_token);
            localStorage.setItem('expires_in', token.expires_in);
            localStorage.setItem('userName', state.login.currentUser.name);
            localStorage.setItem('userEmail', state.login.currentUser.email);
        },
        loginFailed(state, action) {
            state.login.logged = false;
            state.login.isFetching = false;
            state.login.mess = action.payload;
        },
    },
});

const { actions, reducer } = authSlice;
export const { loginStart, loginFailed, loginSuccess } = actions;
export default reducer;
