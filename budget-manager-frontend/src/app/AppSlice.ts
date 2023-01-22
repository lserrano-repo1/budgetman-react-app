import { createSlice } from "@reduxjs/toolkit";
import { appState } from './App.d';


export const initialState: appState = {
    
    personData:{
        salutation:'',
        firstName:'',
        lastName:'',
        loginData:{
            email:'',
            password:'',
        },
        authentication:{
            usr_token:'',
            isAuthenticated:null
        }
    }
};

/** Create redux slice */
export const AppSlice = createSlice({
    name: 'appGeneralStore',
    initialState,
    reducers: {},
    extraReducers: {},
});


export default AppSlice.reducer;