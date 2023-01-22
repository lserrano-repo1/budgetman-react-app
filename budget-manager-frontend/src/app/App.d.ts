export interface appState  {
    personData: PersonData;
}

export interface PersonLoginData {
    email:string;
    password:string;
}

export interface AuthenticationInfo {
    usr_token : string;  //usrLoggedToken
    isAuthenticated:null|boolean;
}

export interface PersonData {
    salutation:string
    firstName:string;
    lastName:string;
    loginData:PersonLoginData;
    authentication: AuthenticationInfo;
}


export interface UserLoginState extends PersonData {
    errorField : ErrorField[];
}

export interface UserLoginProps {
    login:UserLoginState;
    handleInputValue: (payload:InputChange) => ActionCreatorWithPayload<InputChange,string>;

}


export interface ErrorField {
    field: string;
    error: string;
}

export interface InputChange {
    value: string;
    field: string;
}


export interface DDLData {
    label:string;
    value:string;
}