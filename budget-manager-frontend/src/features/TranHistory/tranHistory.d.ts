
import { DDLData, InputChange } from "../../app/App";

export interface TranHistoryProps{
    tranHistory:TranHistoryState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;
}


export interface TranHistoryState{
    tranHistoryFilters:TranHistoryFilters;

    tranHistoryList: TranHistoryData[];
    ddlCategories: DDLData[];
    ddlAccounts: DDLData[];

    errorField : ErrorField[];
}

export interface TranHistoryFilters {
    trnCreationDate: string|null;
    catId: string|null;
    accId:string|null;
}

export interface TranHistoryData{
    trnId:string|null;
    curName: string|null;
    accNumber: string|null;
    bankName: string|null;
    catName: string|null;
    tranType: string|null;
    tranAmount:string|null;
    tranDescription: string|null;
    tranDate: string|null;
}