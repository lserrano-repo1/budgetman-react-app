import React from 'react';
import { ErrorField, InputChange } from "../../app/App";


export interface TransactionProps {
    trans : TransactionState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;
}


export interface TransactionState {
    transData: TransactionData;
    errorField : ErrorField[];
    tranList: TransactionData[];
    mode:"Update"|"Delete"|"Create"|"Display"|"Unknown";
    ddlCategories: DDLData[];
    ddlAccounts: DDLData[];
    ddlCurrencies: DDLData[];
    ddlTranTypes: DDLData[];
}




export interface TransactionData {
    curId:string;
    accId:string;
    catId:string;
    typId:string;
    trnAmount:string;
    trnDescription:string;
    trnId?:string;
}