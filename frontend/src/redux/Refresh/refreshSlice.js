import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
    name: 'refresh',
    initialState: {
        refreshTree: false,
        bootScreen: true,
    },
    reducers: {
        changeRefreshTree(state, action) {
            state.refreshTree = action.payload;
        },
        changeBootScreen(state, action) {
            state.bootScreen = action.payload;
        },
    },
});

const { actions, reducer } = refreshSlice;

export const { changeRefreshTree, changeBootScreen } = actions;

export default reducer;
