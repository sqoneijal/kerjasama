import { createSlice } from "@reduxjs/toolkit";

export const store = createSlice({
   name: "store",
   initialState: {
      sidebarShow: true,
      theme: "light",
      unfoldable: false,
      init: {},
      module: {
         pageType: "",
         pageButton: {},
      },
      filter: {},
   },
   reducers: {
      setInit: (state, action) => {
         state.init = action.payload;
      },
      setModule: (state, action) => {
         state.module = action.payload;
      },
      setFilter: (state, action) => {
         state.filter = action.payload;
      },
      setSidebarShow: (state, action) => {
         state.sidebarShow = action.payload;
      },
      setTheme: (state, action) => {
         state.theme = action.payload;
      },
      setUnfoldable: (state, action) => {
         state.unfoldable = action.payload;
      },
   },
});
export const { init, setInit, setModule, setFilter, setSidebarShow, setTheme, setUnfoldable } = store.actions;
export default store.reducer;
