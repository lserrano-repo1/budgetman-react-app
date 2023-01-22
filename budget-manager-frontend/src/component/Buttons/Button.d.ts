
import { InputBaseProps } from '@mui/material';
import React from 'react';

export interface ButtonProps extends BtnConfig {
   
    renderBtnCancel?:Boolean;
    renderBtnOkSubmitNext?:Boolean;
    renderBtnOkSubmitNext2?:Boolean;
    renderBtnGoBack?:Boolean;
}

export interface BtnConfig {
    id?:string;
    name?:string;
    label:string;
    /*actionToPerform?: InputBaseProps['onClick'];*/
    onClickAction?: () => void;
    buttonDisabled?:boolean;
    buttonVariant?:"outlined"|"contained"|"text"
}