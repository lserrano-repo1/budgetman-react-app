import React from 'react';
import { ErrorField, InputChange } from "../../app/App";

export interface TransferenceProps {
    transfer : TransferenceState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;
};



export interface TransferenceState {
    srcAccountData: TransferenceData;
    dstAccountData: TransferenceData;

    srcAccountBalance:string;
    dstAccountBalance:string;

    errorField : ErrorField[];
    mode:"Update"|"Delete"|"Create"|"Display"|"Unknown";

    ddlAccounts: DDLData[]; //source account list
    ddlDstCurrencies: DDLData[];
    ddlSrcCurrencies: DDLData[];

    transferExchangeRate:string;
    transSuccedeed:boolean|null;
};



export interface TransferenceData{
    accId:string;
    curId:string;
    catId:string;
    typId:string;
    trnAmount:string;
    trnDescription:string;
    trnId?:string;
};


export interface CurrencyByAccountData{
    accId: string;
    transfAccType: "SRC"|"DST"; /** Account Source or Account destination */
}

export interface TransferProcessData {
    srcAccount : TransferenceData;
    dstAccount : TransferenceData;
}


