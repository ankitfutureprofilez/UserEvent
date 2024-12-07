import { configureStore } from "@reduxjs/toolkit";
import formReducer from './formSlice';
import selectedVenuesReducer from './selectedVenuesSlice';

const store = configureStore({
    reducer: {
        form: formReducer,
        selectedVenues: selectedVenuesReducer,
    }
});

export default store;
