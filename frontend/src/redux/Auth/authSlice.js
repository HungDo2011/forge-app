const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            logged: false,
            mess: null,
        },
        register: {},
        logout: {},
    },
    reducers: {
        loginStart(state) {
            state.login.isFetching = true;
        },
        loginSuccess(state, action) {
            const { token, ...user } = action.payload;
            state.login.currentUser = { ...user };
            state.login.isFetching = false;
            state.login.logged = true;
            state.login.mess = 'Login Success!';

            localStorage.setItem('token', token.access_token);
            localStorage.setItem('expires_in', token.expires_in);
            localStorage.setItem('userName', state.login.currentUser.name);
            localStorage.setItem('userEmail', state.login.currentUser.email);
            localStorage.setItem('logged', true);
        },
        loginFailed(state) {
            state.login.logged = false;
            state.login.isFetching = false;
            state.login.mess = 'Login fail. Check your email or password!';
        },
    },
});

const { actions, reducer } = authSlice;
export const { loginStart, loginFailed, loginSuccess } = actions;
export default reducer;
