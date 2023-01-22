import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InputChange, DDLData } from "../../app/App";
import { TransferenceState, CurrencyByAccountData
    , TransferenceData
    , TransferProcessData } from './transference.d';
import queryString from 'query-string';


const initialState: TransferenceState={
    srcAccountData: {
        accId:'',
        catId:'',
        curId:'',
        trnAmount:'',
        trnDescription:'',
        typId:'',
        trnId:''
    },
    dstAccountData: {
        accId:'',
        catId:'',
        curId:'',
        trnAmount:'',
        trnDescription:'',
        typId:'',
        trnId:''
    },
    errorField: [],
    mode: 'Update',
    ddlAccounts: [], 
    ddlSrcCurrencies: [],
    ddlDstCurrencies: [],
    srcAccountBalance:'',
    dstAccountBalance:'',
    transferExchangeRate:'',
    transSuccedeed:null
};


export const getAllAccountsList = createAsyncThunk<any, any, any>(
    "transfer/srcAccounts",
     async (dataIn: DDLData ) => {
        try {
            console.info(`GET All Source (SRC) bank acounts`);
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
            console.error('Error ocurred while trying to get all registered source accounts: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all registered source accounts" };
        }
     }
);


export const getCurrencyByAccount = createAsyncThunk<any, any, any>(
    "transfer/currencyByAccount",
     async (dataIn: CurrencyByAccountData) => {
        try{
            console.info(`GET All curencies ralted to the given account`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DDL_CURRENCY_BY_ACCOUNT!+`/${dataIn.accId}`);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`dataIn:{accId, transfAccType}`);
            console.info(dataIn.accId);
            console.info(dataIn.transfAccType);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET ALL currencies given an account id, JSON response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
                transfAccType: dataIn.transfAccType
            }
        } catch (error) {
            console.error('Error ocurred while trying to get all currencies filtered by account: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get all currencies filtered by account" };
        }
 
});


export const getAccountSummary = createAsyncThunk<any, any, any>(
    "transfer/accountSummary",
     async (dataIn: CurrencyByAccountData) => {
        try{
            console.info(`GET account summary (balance) given its ID`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_ACCOUNT_SUMMARY!+`/${dataIn.accId}`);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`dataIn:{accId, transfAccType}`);
            console.info(dataIn.accId);
            console.info(dataIn.transfAccType);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET account summary (balance) given its ID, JSON response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
                transfAccType: dataIn.transfAccType
            }
        } catch (error) {
            console.error('Error ocurred while trying to get account summary given its ID: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get account summary given its ID" };
        }
 
});



export const getExchangeRate = createAsyncThunk<any, any, any>(
    "transfer/getExchangeRate",
     async (curId: string) => {
        try{
            console.info(`GET Exchange rate for a given currency id`);
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_EXCHANGE_RATE!+`/${curId}`);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            console.info(`dataIn:{curId}`);
            console.info(curId);

            const response = await fetch(urlToFetch.url,
                {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" }
                });

            const jsonResp = await response.json();

            console.log(`GET Exchange rate for a given currency id, JSON response`);
            console.log(jsonResp);

            return {
                data: jsonResp.rows,
            }
        } catch (error) {
            console.error('Error ocurred while trying to get exchange rates: ' + error);
            console.log(error);
            return { message: "Error ocurred while trying to get exchange rates" };
        }
 
});

/** Processess to create money transferences between accounts */
export const handleTransferenceCreate = createAsyncThunk<any, any, any>(
    'transfer/create',
    async (dataIn: TransferProcessData ) => {
        try {

            // FIRST TRANSACTION over source account
            console.info(`-  [SRC] Transference transaction Create @ handleTransferenceCreate -`);
            const srcUrlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_TRANSACTION_CREATE! );

            console.info('{srcUrlToFetch,srcUrlToFetch.url}');
            console.info(srcUrlToFetch.url);

    
            console.info(`Source Account data`);
            console.info(dataIn.srcAccount);


            const srcResponse = await fetch(srcUrlToFetch.url, {
                method: 'POST',
                body: JSON.stringify(dataIn.srcAccount),
                headers: { "Content-Type": "application/json" }
            });

            const srcJsonResp = await srcResponse.json();
            console.log(`CREATING first Transference transaction over SOURCE table, json response`);
            console.log(srcJsonResp);




             // SECOND TRANSACTION over destination account
            console.info(`-  [DST] Transference transaction Create @ handleTransferenceCreate -`);
            const dstUrlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_TRANSACTION_CREATE! );

            console.info('{dstUrlToFetch,dstUrlToFetch.url}');
            console.info(dstUrlToFetch.url);

    
            console.info(`Destination Account data`);
            console.info(dataIn.dstAccount);


            const dstResponse = await fetch(dstUrlToFetch.url, {
                method: 'POST',
                body: JSON.stringify(dataIn.dstAccount),
                headers: { "Content-Type": "application/json" }
            });

            const dstJsonResp = await dstResponse.json();
            console.log(`CREATING first Transference transaction over SOURCE table, json response`);
            console.log(dstJsonResp);



            return {
                srcMessage: srcJsonResp.message,
                srcTrnId: srcJsonResp.trnId,

                dstMessage: dstJsonResp.message,
                dstTrnId: dstJsonResp.trnId
            }


        } catch (error) {
            console.error('Error ocurred while trying to create a new TRANSACTION: ' + error);
            console.log(error);
           
            return {
                srcMessage: 'ERROR: '+error,
                srcTrnId: '',

                dstMessage: 'ERROR: '+error,
                dstTrnId: ''
            }
            
        }
    }
);




export const transferenceSlice = createSlice({
    name:'transferenceSlc',
    initialState,
    reducers:{
        handleInputValue: (state: TransferenceState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

            getNewValues(field, state, value);
        },
        setMode: (state: TransferenceState, action: PayloadAction<any>) => {
            const { mode } = action.payload;
            console.log("Setting Transaction Mode");
            console.log(action.payload);
            state.mode = action.payload;
        },
        handleClearForm: (state: TransferenceState, action: PayloadAction<any>) => {
            const act = action.payload;
            console.log("Clearing selections and aborting process");
            
            state.srcAccountBalance='';
            state.srcAccountData.accId='';
            state.srcAccountData.catId='';
            state.srcAccountData.curId='';
            state.srcAccountData.trnAmount='';
            state.srcAccountData.trnDescription='';
            state.srcAccountData.typId='';

            state.dstAccountBalance='';
            state.dstAccountData.accId='';
            state.dstAccountData.catId='';
            state.dstAccountData.curId='';
            state.dstAccountData.trnAmount='';
            state.dstAccountData.trnDescription='';
            state.dstAccountData.typId='';

            state.transferExchangeRate='';

        },
    },
    
    extraReducers:(builder)=>{
        builder
            .addCase(getAllAccountsList.fulfilled, (state:TransferenceState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getAllAccountsList -> action.payload");
                console.log(action.payload);
                state.ddlAccounts = data;
            })

            .addCase(getCurrencyByAccount.fulfilled, (state: TransferenceState, action: PayloadAction<any>) => {
                const { data, transfAccType } = action.payload;
                console.log("getCurrencyByAccount -> action.payload");
                console.log(action.payload);

                if (data !== undefined && data.length > 0) {
                    if (transfAccType === 'SRC') {
                        state.ddlSrcCurrencies = data;
                        state.srcAccountData.curId = data[0].value;
                    } else if (transfAccType === 'DST') {
                        state.ddlDstCurrencies = data;
                        state.dstAccountData.curId = data[0].value;
                    } else {
                        state.ddlDstCurrencies = [];
                        state.dstAccountData.curId = "";
                        state.ddlSrcCurrencies = [];
                        state.srcAccountData.curId = "";
                    }
                }

            })


            .addCase(getAccountSummary.fulfilled, (state: TransferenceState, action: PayloadAction<any>) => {
                const { data, transfAccType } = action.payload;
                console.log("getAccountSummary -> action.payload");
                console.log(action.payload);

                if (data !== undefined && data.length > 0) {
                    if (transfAccType === 'SRC') {
                        state.srcAccountBalance = data[0].accBalance;

                    } else if (transfAccType === 'DST') {
                        state.dstAccountBalance = data[0].accBalance;
                    } else {
                        state.srcAccountBalance = '';
                        state.dstAccountBalance = '';
                    }
                }

            })    
            
            
            .addCase(getExchangeRate.fulfilled, (state:TransferenceState, action:PayloadAction<any>) =>{
                const {data} = action.payload;
                console.log("getExchangeRate -> action.payload");
                console.log(action.payload);

                if (data !== undefined && data.length > 0) {
                    state.transferExchangeRate = data[0].excValue;
                }
            })

            .addCase(handleTransferenceCreate.fulfilled, (state: TransferenceState, action: PayloadAction<any>) => {
                const { srcMessage, srcTrnId, dstMessage, dstTrnId } = action.payload;
                console.log("handleTransferenceCreate -> action.payload");

                console.log(action.payload);

                if (srcTrnId !== '' && dstTrnId !== '' && !srcMessage.includes("ERROR") && !dstMessage.includes("ERROR")) {
                    state.transSuccedeed = true;
                } else {
                    state.transSuccedeed = false;
                }

                // Clearing all data
                /*state.srcAccountBalance='';
                state.srcAccountData.accId='';
                state.srcAccountData.catId='';
                state.srcAccountData.curId='';
                state.srcAccountData.trnAmount='';
                state.srcAccountData.trnDescription='';
                state.srcAccountData.typId='';
    
                state.dstAccountBalance='';
                state.dstAccountData.accId='';
                state.dstAccountData.catId='';
                state.dstAccountData.curId='';
                state.dstAccountData.trnAmount='';
                state.dstAccountData.trnDescription='';
                state.dstAccountData.typId='';*/

            })
    },
});



function getNewValues(field: string, state: TransferenceState, value: string) {
    switch (field) {
        case 'src-account-number-text-field':
            state.srcAccountData.accId = value;
            state.dstAccountData.accId='';
            state.dstAccountData.curId='';
            break;
        case 'dst-account-number-text-field':
            state.dstAccountData.accId = value;
            break;
        case 'src-amount-to-transfer-text-field':
            state.srcAccountData.trnAmount=value;
            break;
    }
};

export const {handleInputValue, setMode, handleClearForm} = transferenceSlice.actions;

export default transferenceSlice.reducer;
