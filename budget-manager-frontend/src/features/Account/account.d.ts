import React from 'react';
import { ErrorField, InputChange } from "../../app/App";


export interface AccountProps{
    account:AccountState,
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;
}


export interface AccountState{
    accountData: AccountData;
    
    errorField : ErrorField[];
    accountList: AccountListData[];

    mode:"Update"|"Delete"|"Create"|"Display"|"Unknown";

    ddlUsers:DDLData[];
    ddlBanks:DDLData[];
    ddlCurrencies: DDLData[];

}




export interface AccountData {
    usrId: string;
    bnkId: string;
    curId: string
    accNumber:string;
    accBalance: string
}


export interface AccountListData {
    usrName: string|null;
    bankName:string|null;
    accNumber:string|null;
    curName:string|null;
    accLastUpdate:string|null;
    accBalance:string|null
}


export interface LoadDDLValuesData {
    list: "USERS"|"BANKS"|"CURRENCIES";
}