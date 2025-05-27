import { createSlice } from "@reduxjs/toolkit";

export const redux = createSlice({
   name: "redux",
   initialState: {
      init: {},
      module: {},
      position: [],
      filter: {},
      sidebarShow: true,
      sidebarUnfoldable: false,
      theme: "light",
   },
   reducers: {
      setInit: (state, { payload } = action) => {
         state.init = payload;
      },
      position: (state, { payload } = action) => {
         state.position = payload;
      },
      setModule: (state, { payload } = action) => {
         state.module = payload;
      },
      setFilter: (state, { payload } = action) => {
         state.filter = payload;
      },
      setSidebarShow: (state, { payload } = action) => {
         state.sidebarShow = payload;
      },
      setTheme: (state, { payload } = action) => {
         state.theme = payload;
      },
      setSidebarUnfoldable: (state, { payload } = action) => {
         state.sidebarUnfoldable = payload;
      },
   },
});
export const { init, setInit, setModule, position, setFilter, setSidebarShow, setTheme, setSidebarUnfoldable } = redux.actions;
export default redux.reducer;
