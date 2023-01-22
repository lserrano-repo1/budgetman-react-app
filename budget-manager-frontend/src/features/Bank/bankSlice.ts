import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { InputChange } from "../../app/App";
import { BankState, BankData } from './bank.d';
import queryString from 'query-string';

const initialState: BankState = {
    bankData: {
        bankName: '',
        bankAddress: '',
        bankContact: '',
        bankEmail: '',
        bankId: ''
    },
    banksList: [],
    errorField: [],
    mode: "Display"
};


export const handleBankCreation = createAsyncThunk<any, any, any>(
    'bank/create',
    async (data: BankData) => {
        try {
            console.info(`--- BANK CREATION ---`);
            console.info(`BankData`);
            console.info(data);
            
            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_NEW_BANK!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);


            const response = await fetch(urlToFetch.url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });

            const jsonResp = await response.json();
            console.log(`CREATE BANK json response`);
            console.log(jsonResp);

            return {
                message: jsonResp.message,
                bankId: jsonResp.bankId
            }
        } catch (error) {
            console.error('Error ocurred while trying to create a new BANK: ' + error);
            console.log(error);
            return { message: 'Error ocurred while trying to create a new BANK', bankId: null };
        }
    }
);


/**
 * This method will handle bank info updates
 */
export const handleBankUpdate = createAsyncThunk<any, any, any>(
    'bank/update',
    async (data: BankData) => {
        try {
            console.info(`--- BANK UPDATE ---`);
            console.info(`BankData`);
            console.info(data);

            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_UPDATE_BANK!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            const response = await fetch(urlToFetch.url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });

            const jsonResp = await response.json();
            console.log(`UPDATE BANK json response`);
            console.log(jsonResp);

            return {
                message: jsonResp.message,
                bankId: jsonResp.bankId
            }
        } catch (error) {
            console.error('Error ocurred while trying UPDATE bank information: ' + error);
            console.log(error);
            return { message: null, bankId: null };
        }
    }
);


export const getAllBanks = createAsyncThunk<any, any, any>(
    'bank/getAll',
    async (data: BankData) => {
        try {
                console.info(`--- GET ALL BANKS ---`);

                const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_GET_ALL_BANKS!);

                console.info('{urlToFetch,urlToFetch.url}');
                console.info(urlToFetch.url);
    
                const response = await fetch(urlToFetch.url, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const jsonResp = await response.json();
            console.log(`GET ALL Banks json response`);
            console.log(jsonResp);

            return {
                data: jsonResp.data,
            }
        } catch (error) {
            console.error('Error ocurred while trying to ALL BANKS: ' + error);
            console.log(error);
            return { message: null, bankId: null };
        }
    }
);


export const getByBankId = createAsyncThunk<any, any, any>(
    'bank/getByBankId',
    async (data: BankData) => {
        try {
            console.info(`--- GET BANK BY ID ---`);

            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_GET_BANK_BY_ID!+`/${data.bankId}`);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);
            
            const response = await fetch(urlToFetch.url, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const jsonResp = await response.json();
            console.log(`GET BANK BY ID json response`);
            console.log(jsonResp);

            return {
                data: jsonResp.data,
            }
        } catch (error) {
            console.error('Error ocurred while trying to ALL BANKS: ' + error);
            console.log(error);
            return { message: null, bankId: null };
        }
    }
);


export const deleteBankById = createAsyncThunk<any, any, any>(
    'bank/deleteById',
    async (data: BankData) => {
        try {
            console.info(`--- DELETE BANK BY ID ---`);

            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_DELETE_BANK!+`/${data.bankId}`);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);
            
            const response = await fetch(urlToFetch.url, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            });

            const jsonResp = await response.json();
            console.log(`DELETE BANK BY ID json response`);
            console.log(jsonResp);

            return {
                message: jsonResp.message,
                bankId: data.bankId
            }
        } catch (error) {
            console.error('Error ocurred while trying to delete Bank by ID: ' + error);
            console.log(error);
            return { message: null, bankId: null };
        }
    }
);





export const bankSlice = createSlice({
    name: 'bankSlc',
    initialState,
    reducers: {
        handleInputValue: (state: BankState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;

            getNewValues(field, state, value);
        },

        setMode: (state: BankState, action: PayloadAction<any>) => {
            const { mode } = action.payload;
            console.log("Setting Formulary Mode");
            console.log(action.payload);
            state.mode = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleBankCreation.fulfilled, (state: BankState, action: PayloadAction<any>) => {
                const { message, bankId } = action.payload;
                state.bankData.bankId = bankId;
                state.mode = 'Display'; //return to mode Display

                /*console.log("IMPORTANT payload");
                console.log(action.payload);*/
            })
            .addCase(getAllBanks.fulfilled, (state: BankState, action: PayloadAction<any>) => {
                const { data } = action.payload;

                /* console.log("BANKS LIST payload");
                 console.log(action.payload);*/
                state.banksList = data;
            })
            .addCase(handleBankUpdate.fulfilled, (state: BankState, action: PayloadAction<any>) => {
                const { message, bankId } = action.payload;
                state.bankData.bankId = bankId;
                state.mode = 'Display'; //After an update the form should be hidden
                console.log("UPDATE payload");
                console.log(action.payload);

            })
            .addCase(getByBankId.fulfilled, (state: BankState, action: PayloadAction<any>) => {
                const { data } = action.payload;

                console.log("BANK DATA BY ID payload");
                console.log(action.payload);


                state.bankData.bankId = data[0].bankId;
                state.bankData.bankName = data[0].bankName;
                state.bankData.bankAddress = data[0].bankAddress;
                state.bankData.bankContact = data[0].bankContact;
                state.bankData.bankEmail = data[0].bankEmail;
                state.mode = 'Update'; //The next action to perform


            })
            .addCase(deleteBankById.fulfilled, (state: BankState, action: PayloadAction<any>) => {
                const { data } = action.payload;

                console.log("DELETE bank by id payload");
                console.log(action.payload);
                state.bankData.bankId = "0";
                state.bankData.bankName = " ";
                state.mode = 'Display'; //The next action to perform      
            })


    },
});


function getNewValues(field: string, state: BankState, value: string) {
    switch (field) {
        case 'bank-name-text-field':
            state.bankData.bankName = value;
            break;
        case 'bank-address-text-field':
            state.bankData.bankAddress = value;
            break;
        case 'bank-contact-text-field':
            state.bankData.bankContact = value;
            break;
        case 'bank-contact-email-text-field':
            state.bankData.bankEmail = value;
            break;
    }
}


export const { handleInputValue, setMode } = bankSlice.actions;

export default bankSlice.reducer;



