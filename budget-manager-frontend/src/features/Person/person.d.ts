import React from 'react';
import { ErrorField, InputChange } from "../../app/App";


export interface PersonState {
    personData: PersonData;
    errorField : ErrorField[];
};

export interface PersonLoginData {
    email:string;
    password:string;
    password2:string;
};

export interface PersonCreateData {
    salutation:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    password2:string;
}

export interface AuthenticationInfo {
    usr_token : string; 
    isAuthenticated:null|boolean;
};

export interface PersonData {
    salutation:string
    firstName:string;
    lastName:string;
    loginData:PersonLoginData;
    authentication: AuthenticationInfo;
};


export interface PersonProps {
    person:PersonState
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;
    handleUserLogOut: () => ActionCreatorWithPayload<string>;
}

