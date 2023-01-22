import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { AccountData, DashboardState } from './dashboard.d';
import { InputChange } from "../../app/App";
import queryString from 'query-string';



const initialState:DashboardState={
    filters: {
        filterDate: null,
        filterCategory: null,
        filterBankAccount: null,
    },
    errorField: [],
    accList: []
};


export const getAllAccounts = createAsyncThunk<any,any,any>(
    'account/getAll',
    async(data:AccountData) =>{
        try {
            console.info(`GET All accounts`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_ACCOUNT_ALL!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            const response = await fetch (urlToFetch.url,
                {
                    method:'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();
            console.log(`GET ALL Accounts json response`);
            console.log(jsonResp);
    
            return {
                data: jsonResp.rows,
            }
            
        } catch (error) {
            console.error('Error ocurred while trying to get all Accounts: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all Accounts" };
        }
    }
);


export const dashboardSlice = createSlice({
    name:'dashboardSlc',
    initialState,
    reducers:{
        handleInputValue: (state: DashboardState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;
           

           // getNewValues(field, state, value);
        },
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getAllAccounts.fulfilled, (state:DashboardState, action:PayloadAction<any>)=>{
                const {data} = action.payload;
                console.log("getAllAccounts -> action.payload");
                console.log(action.payload);
                state.accList = data;
            })
    },
});


export const { handleInputValue } = dashboardSlice.actions;

export default dashboardSlice.reducer;