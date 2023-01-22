import React from 'react';
import { ErrorField, InputChange } from "../../app/App";
export interface DashboardProps {
    dashb : DashboardState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;
}



export interface DashboardState {
    filters:DashboardFilters;
    accList: AccountData[];


    errorField : ErrorField[];
}



export interface DashboardFilters {
    filterDate: string|null;
    filterCategory: string|null;
    filterBankAccount:string|null;
}

export interface AccountData {
    usrName: string|null;
    bankName:string|null;
    accNumber:string|null;
    curName:string|null;
    accLastUpdate:string|null;
    accBalance:string|null
}