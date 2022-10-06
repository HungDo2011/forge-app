import { configureStore } from '@reduxjs/toolkit';

import urnReducer from './UrnLink/urnSlice';
import refreshReducer from './Refresh/refreshSlice';
import authReducer from './Auth/authSlice';

const rootReducer = {
    urn: urnReducer,
    refresh: refreshReducer,
    auth: authReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
