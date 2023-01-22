import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PersonState, PersonLoginData, PersonCreateData} from "./person.d";
import { InputChange } from "../../app/App";
import queryString from 'query-string';

const initialState:PersonState = {
    personData: {
        salutation:'',
        firstName:'',
        lastName:'',
        loginData:{
            email:'',
            password:'',
            password2:'',
        },
        authentication: {
            usr_token : '',
            isAuthenticated: null,
        },
    },
    errorField: []
};


export const handleNewUserCreation = createAsyncThunk<any,any,any>(
    'user/create',
    async(data:PersonCreateData)=>{
        try {
            console.info(`NEW USER CREATION PROCESS`);
            console.info(`PersonCreateData`);
            console.info(data);

            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_NEW_USR!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);

            const response = await fetch(urlToFetch.url,{
                method:'POST',
                body:JSON.stringify(data),
                headers:{"Content-Type":"application/json"}
            })

            const jsonResp = await response.json();

            console.log(`CREATE USER json response`);
            console.log(jsonResp);
            console.log(`Token: `+jsonResp.usr_token);

            localStorage.setItem('usr_token', jsonResp.usr_token);

            return {
                email: jsonResp.email,
                usr_token: jsonResp.usr_token,
                isAuthenticated:true,
            }
            
        } catch (error) {
            console.error('Error ocurred while trying to create a new USER: '+error);
            console.log(error);
            localStorage.removeItem('budman_user_token');
            return {email:null, password:null, usr_token:null, isAuthenticated:false }; 
        }
    }
);



export const handleUserLogin = createAsyncThunk<any,any,any>(
    "auth/login",
    async(data:PersonLoginData)=>{
        try {
            console.info(`USER LOGIN PROCESS`);
            console.info(`data:`);
            console.info(data);

            const urlToFetch = queryString.parseUrl(process.env.REACT_APP_BACK_END_BASE_URL+process.env.REACT_APP_USR_LOGIN!);

            console.info('{urlToFetch,urlToFetch.url}');
            console.info(urlToFetch.url);
            

            const response = await fetch(urlToFetch.url,
            {
                method:'POST',
                body:JSON.stringify(data), 
                headers:{"Content-Type":"application/json"}
            })

            const jsonResp = await response.json();
            
            
            console.log(`jsonResp:`);
            console.log(jsonResp);
            
            localStorage.setItem('usr_token', jsonResp.usr_token);


            if(jsonResp.token ==='' || jsonResp.email===''){
                return {
                    email: jsonResp.email,
                    usr_token: 'invalid',
                    isAuthenticated:false,
                    message:jsonResp.message
                }
            } else {
                return {
                    email: jsonResp.email,
                    usr_token: jsonResp.token,
                    isAuthenticated:true,
                    message:jsonResp.message
                }
            }

        } catch (error) {
            console.error('Error ocurred while trying to login: '+error);
            console.log(error);
            localStorage.removeItem('budman_user_token');
            return {email:null, password:null, usr_token:null, isAuthenticated:false }; 
        }
    });



export const personSlice = createSlice({
    name: 'userLoginSlc',
    initialState,
    reducers: {
        handleInputValue: (state: PersonState, action: PayloadAction<InputChange>) => {
            const { value, field } = action.payload;
            getNewValues(field, state, value);
        },
        handleUserLogOut: (state: PersonState, action: PayloadAction) => {
           
            state.personData.loginData.email = "";
            state.personData.loginData.password="";
            state.personData.authentication.usr_token = "";
            state.personData.authentication.isAuthenticated = null;
            state.personData.firstName="";
            state.personData.lastName="";
            state.personData.salutation="";
            
        },
    },
    extraReducers:(builder)=> {
        builder
            .addCase(handleUserLogin.fulfilled, (state:PersonState, action:PayloadAction<any>) =>{
                const {email, usr_token, isAuthenticated} = action.payload;
                console.log("FULFILLED Response for handleUserLogin..." + action.payload);
                console.log(action.payload);
                
                state.personData.loginData.email = email;
                state.personData.authentication.usr_token = usr_token;
                state.personData.authentication.isAuthenticated = isAuthenticated;
        })
        .addCase(handleUserLogin.rejected, (state:PersonState, action:PayloadAction<any>) =>{
            const {email, usr_token, isAuthenticated} = action.payload;
            console.log("REJECTED Response for handleUserLogin..." + action.payload);
            console.log(action.payload);
            state.personData.loginData.email = "";
            state.personData.loginData.password="";
            state.personData.loginData.password2="";
            state.personData.authentication.usr_token = "";
            state.personData.authentication.isAuthenticated = null;
            state.personData.firstName="";
            state.personData.lastName="";
            state.personData.salutation="";
        })
        .addCase(handleNewUserCreation.fulfilled, (state:PersonState, action:PayloadAction<any>)=>{
            const {email, usr_token, isAuthenticated} = action.payload;
                console.log("FULFILLED Response for handleNewUserCreation..." + action.payload);
                console.log(action.payload);
                
                state.personData.loginData.email = email;
                state.personData.authentication.usr_token = usr_token;
                state.personData.authentication.isAuthenticated = isAuthenticated; 
        })
        .addCase(handleNewUserCreation.rejected, (state:PersonState, action:PayloadAction<any>)=>{
            const {email, usr_token, isAuthenticated} = action.payload;
            console.log("REJECTED Response for handleNewUserCreation..." + action.payload);
            console.log(action.payload);

            state.personData.loginData.email = email;
            state.personData.authentication.usr_token = '';
            state.personData.authentication.isAuthenticated = null; 
            state.personData.loginData.password="";
            state.personData.loginData.password2="";

        })


    },
});


function getNewValues(field: string, state: PersonState, value: string) {
    switch (field) {
        case 'email-text-field':
            state.personData.loginData.email = value;
            break;
        case 'pswrd-text-field':
            state.personData.loginData.password = value;
            break;
        case 'pswrd2-text-field':
            state.personData.loginData.password2 = value;
            break;
        case 'salutation-text-field':
            state.personData.salutation = value;
            break;
        case 'firstName-text-field':
            state.personData.firstName=value;
            break;
        case 'lastName-text-field':
            state.personData.lastName = value;
            break;
        case 'token-text-field':
            state.personData.authentication.usr_token   =value;
            break;
    }
};


/** Exporting actions */
export const { handleInputValue 
    , handleUserLogOut} = personSlice.actions;


/** Exporting reduced */
export default personSlice.reducer;

export const usr_token = (state:RootState) => state.personReducer.personData.authentication.usr_token;
export const isAuthenticated = (state:RootState) => state.personReducer.personData.authentication.isAuthenticated;
export const salutation = (state:RootState) => state.personReducer.personData.salutation;
export const lastName = (state:RootState) => state.personReducer.personData.lastName;