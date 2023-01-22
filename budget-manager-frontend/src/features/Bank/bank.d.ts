import React from 'react';
import { ErrorField, InputChange } from "../../app/App";


export interface BankProps{
    bank: BankState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;
}


export interface BankState{
    bankData: BankData;
    errorField : ErrorField[];
    banksList: BankData[];
    mode:"Update"|"Delete"|"Create"|"Display"|"Unknown";
}


export interface BankData {
    bankName:string;
    bankAddress:string;
    bankContact:string;
    bankEmail:string;
    bankId:string;
}