import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InputChange, DDLData } from "../../app/App";
import { TransactionState, TransactionData } from './transaction.d';
import queryString from 'query-string';


const initialState: TransactionState={
    transData: {
        accId:'',
        catId:'',
        curId:'',
        trnAmount:'',
        trnDescription:'',
        typId:'',
        trnId:''
    },
    tranList: [],
    errorField: [],
    mode: 'Display',
    ddlAccounts:[],
    ddlCategories:[],
    ddlCurrencies:[],
    ddlTranTypes:[],
};


export const getCurrencyByAccount = createAsyncThunk<any, any, any>(
    "ddl/currencyByAccount",
     async (accId: string) => {
        try{
            console.info(`GET All curencies ralted to the given account`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_CURRENCY_BY_ACCOUNT!+`/${accId}`);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`account Id:`);
            console.info(accId);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL currencies given an account id json response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
            }
        } catch (error) {
            console.error('Error ocurred while trying to get all currencies filtered by account: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all currencies filtered by account" };
        }
 
});


export const getAllAccountsList = createAsyncThunk<any, any, any>(
    "ddl/accounts",
     async (dataIn: DDLData ) => {
        try {
            console.info(`GET All bank acounts`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_ACCOUNTS!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`DDLData`);
            console.info(dataIn);

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
     async (dataIn: DDLData) => {
        try {
            console.info(`GET All categories`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_CATEGORIES!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`DDLData`);
            console.info(dataIn);

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


export const getTransactionTypes = createAsyncThunk<any, any, any>(
    "ddl/tranTypes",
     async (dataIn: DDLData) => {
        try{
            console.info(`GET All transaction types`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_TRAN_TYPES! );

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL transaction types json response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
            }
        } catch (error) {
            console.error('Error ocurred while trying to get all transaction types: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all transaction types" };
        }
 
});


export const handleTransactionCreation = createAsyncThunk<any, any, any>(
    'transaction/create',
    async (data: TransactionData) => {
        try {

            console.info(`- Transaction Create @ handleTransactionCreation -`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_TRANSACTION_CREATE! );

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`TransactionData`);
            console.info(data);

            const response = await fetch(urlToFetch.url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });

            const jsonResp = await response.json();
            console.log(`CREATE New Transaction, JSON response`);
            console.log(jsonResp);

            return {
                message: jsonResp.message,
                trnId: jsonResp.trnId
            }
        } catch (error) {
            console.error('Error ocurred while trying to create a new TRANSACTION: ' + error);
            console.log(error);
            return { message: 'Error ocurred while trying to create a new TRANSACTION', trnId: null };
        }
    }
);



export const transactionSlice = createSlice({
    name:'tranSlc',
    initialState,
    reducers:{
        handleInputValue: (state: TransactionState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

            getNewValues(field, state, value);
        },
        setMode: (state: TransactionState, action: PayloadAction<any>) => {
            const { mode } = action.payload;
            console.log("Setting Transaction Mode");
            console.log(action.payload);
            state.mode = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllAccountsList.fulfilled, (state:TransactionState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getAllAccountsList -> action.payload");
                console.log(action.payload);
                state.ddlAccounts = data;
            })

            .addCase(getCurrencyByAccount.fulfilled, (state:TransactionState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getCurrencyByAccount -> action.payload");
                console.log(action.payload);
                state.ddlCurrencies = data;

                //TODO: Do this better. 
                if (data !== undefined && data.length > 0) {
                state.transData.curId = data[0].value;
                }
            })

            .addCase(getAllCategoriesList.fulfilled, (state:TransactionState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getAllCategoriesList -> action.payload");
                console.log(action.payload);
                state.ddlCategories = data;
            })

            .addCase(getTransactionTypes.fulfilled, (state:TransactionState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getTransactionTypes -> action.payload");
                console.log(action.payload);
                state.ddlTranTypes = data;
            })

            .addCase(handleTransactionCreation.fulfilled, (state: TransactionState, action: PayloadAction<any>) => {
                const { message, trnId } = action.payload;
                state.transData.trnId = trnId;
                state.mode = 'Display'; //return to mode Display

            })


            
    },
});

function getNewValues(field: string, state: TransactionState, value: string) {
    switch (field) {
        case 'account-number-text-field':
            state.transData.accId = value;
            break;
        case 'currency-text-field':
            state.transData.curId = value;
            break; 
        case 'category-text-field':
            state.transData.catId = value;
            break; 
        case 'tran-type-text-field':
            state.transData.typId=value;
            break;
        case 'tran-amount-text-field':
            state.transData.trnAmount=value;
            break;
        case 'tran-description-text-field':
            state.transData.trnDescription=value;
            break;
    }
};

export const {handleInputValue, setMode} = transactionSlice.actions;

export default transactionSlice.reducer;