import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InputChange, DDLData } from "../../app/App";
import { AccountProps
    , AccountData
    , AccountListData
    , AccountState
    , LoadDDLValuesData } from './account.d';
import {TransferenceData} from '../Transfer/transference.d';
import queryString from 'query-string';
import { RootState } from "../../app/store";




const initialState:AccountState ={
    accountData: {
        usrId: '',
        bnkId: '',
        curId: '',
        accNumber:'',
        accBalance: ''
    },
    errorField: [],
    accountList: [],
    mode: 'Display',
    ddlUsers:[],
    ddlBanks:[],
    ddlCurrencies: []
};


export const loadDDLValues = createAsyncThunk<any, any, any>(
    'account/loadDDLValues',
    async (dataIn: LoadDDLValuesData) => {
        try {
            let urlToFetch:any='';
            switch(dataIn.list){
                case 'USERS':
                    console.info(`GET All Users`);
                    urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_USERS!);
                    break;
                case 'BANKS':
                    console.info(`GET All Banks`);
                    urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_BANKS!);
                    break;
                case 'CURRENCIES':
                    console.info(`GET All Currencies`);
                    urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_CURRENCIES!);
                    break;
            }

            console.info('{list, urlToFetch.url}');
            console.info(dataIn.list);
            console.info(urlToFetch.url);
        
            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL ${dataIn.list}, JSON response`);
            console.log(jsonResp);
    
            return {
                data: jsonResp.rows,
                ddlName: dataIn
            }
        } catch (error) {
            console.error('Error ocurred while trying to get all registered banks: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all registered banks" };
        }
    }
);



export const handleAccountCreation = createAsyncThunk<any, any, any>(
    'account/create',
    async (dataIn: AccountData) => {
        try {

            // STEP 1 - CREATE ACCOUNT 
            /*This adjustment considers the trigger 
            in the database to avoid ammount duplicity*/
            const adjustedAccountData: AccountData = {
                accBalance: '0.0',
                accNumber: dataIn.accNumber,
                bnkId: dataIn.bnkId,
                curId: dataIn.curId,
                usrId: dataIn.usrId
            }


            console.info(`- STEP1 ::: Account Create @ handleAccountCreation -`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_ACCOUNT_CREATE! );

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`TransactionData`);
            console.info(dataIn);

            const response = await fetch(urlToFetch.url, {
                method: 'POST',
                body: JSON.stringify(adjustedAccountData),
                headers: { "Content-Type": "application/json" }
            });

            const jsonResp = await response.json();
            console.log(`Step 1: CREATING New Account with initial balance, JSON response`);
            console.log(jsonResp);


            // STEP 2 - CREATE AN INCOME TRANSACTION FOR NEWLY CRATED ACCOUNT
            console.info(`- STEP2 ::: WRITE TRANSACTION RECORD -`);
            let trnId:string='';
            let tranMessage:string='';
            if(jsonResp.accId!==undefined && jsonResp.accId!==''){

               
                //Create transference data object
                const dstAccountData:TransferenceData = {
                    accId: jsonResp.accId,
                    curId: dataIn.curId,
                    catId: '',
                    typId: '1',
                    trnAmount: dataIn.accBalance,
                    trnDescription: 'Account creation with initial balance'
                }

            
                console.info(`-  Transference transaction Create @ handleAccountCreation -`);
                console.info(":: ACCOUNT TRANSACTION DATA ::");
                console.info(dstAccountData);
                const dstUrlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_TRANSACTION_CREATE! );
    
                console.info('{dstUrlToFetch,dstUrlToFetch.url}');
                console.info(dstUrlToFetch.url);
    
        
                console.info(`Transaction data for the new account ${jsonResp.accId}`);
                console.info(dstAccountData);
    
    
                const dstResponse = await fetch(dstUrlToFetch.url, {
                    method: 'POST',
                    body: JSON.stringify(dstAccountData),
                    headers: { "Content-Type": "application/json" }
                });
    
                const dstJsonResp = await dstResponse.json();
                console.log(`Step 2: Registering an INCOME transaction with the creation amount, json response`);
                console.log(dstJsonResp);

                trnId= dstJsonResp.trnId;
                tranMessage=dstJsonResp.message;


            }
            
            
            
            return {
                message: jsonResp.message,
                accId: jsonResp.accId,
                trnMessage: tranMessage,
                trnId: trnId,
            }



        } catch (error) {
            console.error('Error ocurred while trying to create new ACCOUNT: ' + error);
            console.log(error);
            return { message: 'Error ocurred while trying to create new ACCOUNT'
                    , accId:''
                    , trnId:''
                 };
        }
    }
);



export const getAccountsList = createAsyncThunk<any,any,any>(
    'account/getAll',
    async(dataIn:AccountData) =>{
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




export const accountSlice = createSlice({
    name: 'accountSlc',
    initialState,
    reducers: {
        handleInputValue: (state: AccountState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

            getNewValues(field, state, value);
        },

        setMode: (state: AccountState, action: PayloadAction<any>) => {
            const { mode } = action.payload;
            console.log("Setting Formulary Mode");
            console.log(action.payload);
            state.mode = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(loadDDLValues.fulfilled,(state:AccountState, action:PayloadAction<any>)=>{
                const {data, ddlName} = action.payload;
                console.log("loadDDLValues -> action.payload");
                console.log(action.payload);
                if(ddlName!==undefined && ddlName.list!=="" ){
                     switch(ddlName.list){
                        case 'USERS':
                            state.ddlUsers = data;
                            break;
                        case 'BANKS':
                            state.ddlBanks = data;
                            break;
                        case 'CURRENCIES':
                            state.ddlCurrencies = data;
                            break;
                     }
                }
            })

            .addCase(handleAccountCreation.fulfilled, (state: AccountState, action: PayloadAction<any>) => {
                const { message, accId, trnId, trnMessage } = action.payload;
                console.log("handleAccountCreation -> action.payload");
                console.log(action.payload);
               
                if(accId!=='' && trnId!==''){
                    state.accountData.usrId='';
                    state.accountData.curId='';
                    state.accountData.bnkId='';
                    state.accountData.accNumber='';
                    state.accountData.accBalance='';
                } else {
                    console.error("Error creating new account "+message+ " 2-"+trnMessage);
                }

                state.mode = 'Display'; //return to mode Display
            })

            .addCase(getAccountsList.fulfilled, (state:AccountState, action:PayloadAction<any>)=>{
                const {data} = action.payload;
                console.log("getAccountsList -> action.payload");
                console.log(action.payload);
                state.accountList = data;

               
            })


    },
    
});





function getNewValues(field: string, state: AccountState, value: string) {
    switch (field) {
        case 'account-owner-text-field':
            state.accountData.usrId = value;
            break;
        case 'bank-name-text-field':
            state.accountData.bnkId = value;
            break;
        case 'currency-text-field':
            state.accountData.curId = value;
            break;
        case 'account-number-text-field':
            state.accountData.accNumber = value;
            break;
        case 'account-balance-text-field':
            state.accountData.accBalance = value;
            break;
    }
}



export const { handleInputValue, setMode } = accountSlice.actions;
export const accountList = (state:RootState) => state.accountReducer.accountList;
export default accountSlice.reducer;
