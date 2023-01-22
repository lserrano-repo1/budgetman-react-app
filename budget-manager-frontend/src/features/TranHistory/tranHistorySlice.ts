import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {TranHistoryData, TranHistoryState} from "./tranHistory.d";
import { DDLData, InputChange } from "../../app/App";
import queryString from 'query-string';
import { format, parse, parseISO } from 'date-fns';




const initialState:TranHistoryState={
    tranHistoryFilters: {
        accId:'',
        catId:'',
        trnCreationDate:''
    },
    errorField: [],
    tranHistoryList: [],
    ddlCategories:[],
    ddlAccounts:[],
    
};

export const getAllAccountsList = createAsyncThunk<any, any, any>(
    "ddl/accounts",
     async (data: DDLData) => {
        try {
            console.info(`GET All bank aacounts`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_ACCOUNTS!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`DDLData`);
            console.info(data);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL Accounts json response`);
            console.log(jsonResp);
    
            return {
                data: jsonResp.rows,
            }
              
        } catch (error) {
            console.error('Error ocurred while trying to get all registered accounts: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all registered accounts" };
        }
     }
);

 
export const getAllCategoriesList = createAsyncThunk<any, any, any>(
    "ddl/categories",
     async (data: DDLData) => {
        try {
            console.info(`GET All categories`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_CATEGORIES!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`DDLData`);
            console.info(data);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL Categories json response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
            }
              
        } catch (error) {
            console.error('Error ocurred while trying to get all categories: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all categories" };
        }
     }
);



export const getAllTransactionsForFilter = createAsyncThunk<any, any, any>(
    "transaction/getAll",
    async (data: TranHistoryData) => {
        try {
            console.info(`POST retrieve all transactions`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_TRANS_HISTORY_FILTER!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`TranHistoryData`);
            console.info(data);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL Transactions for filter json response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
            }

        } catch (error) {
            console.error('Error ocurred while trying to get all transactions history: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all transactions history" };
        }

    }
);


export const tranHistorySlice = createSlice({
    name:'tranHistorySlc',
    initialState,
    reducers:{
        handleInputValue: (state: TranHistoryState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

           getNewValues(field, state, value);
        },


        clearFilters: (state: TranHistoryState, action: PayloadAction<any>) => {
            const actionpl = action.payload;
            state.tranHistoryFilters.accId='';
            state.tranHistoryFilters.catId='';
            state.tranHistoryFilters.trnCreationDate='';
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllTransactionsForFilter.fulfilled, (state:TranHistoryState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getAllTransactionsForFilter -> action.payload");
                console.log(action.payload);
                state.tranHistoryList = data;
            })

            .addCase(getAllCategoriesList.fulfilled, (state:TranHistoryState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getAllCategoriesList -> action.payload");
                console.log(action.payload);
                state.ddlCategories = data;
            })

            .addCase(getAllAccountsList.fulfilled, (state:TranHistoryState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getAllAccountsList -> action.payload");
                console.log(action.payload);
                state.ddlAccounts = data;
            })

            
            

    },
});



function getNewValues(field: string, state:TranHistoryState , value: string) {
    switch (field) {
        case 'datefilter-text-field':
            state.tranHistoryFilters.trnCreationDate= value;
            break;
        case 'filter-category-text-field':
            state.tranHistoryFilters.catId=value;
            break;
        case 'filter-account-number-text-field':
            state.tranHistoryFilters.accId=value;
            break;
    }
};



export const {handleInputValue, clearFilters} = tranHistorySlice.actions;

export default tranHistorySlice.reducer;