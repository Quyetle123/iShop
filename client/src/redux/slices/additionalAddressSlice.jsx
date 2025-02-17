import {createSlice} from "@reduxjs/toolkit";

const additionalAddressSlice = createSlice({
    name: "additionalAddresses",
    initialState: {
        additionalAddresses: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchAdditionalAddressesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAdditionalAddressesSuccess: (state, action) => {
            state.loading = false;
            state.additionalAddresses = action.payload;
            state.error = null;
        },
        fetchAdditionalAddressesError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            
        },
        addAdditionalAddressStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addAdditionalAddressSuccess: (state, action) => {
            state.loading = false;
            state.additionalAddresses.push(action.payload);
            state.error = null;
        },
        addAdditionalAddressError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchAdditionalAddressesStart,
    fetchAdditionalAddressesSuccess,    
    fetchAdditionalAddressesError,
    addAdditionalAddressStart,
    addAdditionalAddressSuccess,
    addAdditionalAddressError
} = additionalAddressSlice.actions;

export default additionalAddressSlice.reducer;