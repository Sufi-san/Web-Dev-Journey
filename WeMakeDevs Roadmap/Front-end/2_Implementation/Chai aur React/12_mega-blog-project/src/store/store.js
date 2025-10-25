import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        authReducer
        // we can also create a slice for 'posts' and add its reducers here
    }
});

export default store;