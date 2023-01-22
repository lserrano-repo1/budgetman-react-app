export interface InputSelectFieldProps {
    id?:string;
    name?:string;
    label:string;
    value?: unknown;
    style?: React.CSSProperties;
    type?: React.HTMLInputTypeAttribute|undefined;
    maxLength?: any;
    error?: ErrorField[];
    
    itemsList?:ItemsList[];

    inputFieldContainerStyle?:React.CSSProperties;

    onBlur?: InputBaseProps['onBlur'];
    onChange?: StandardInputProps['onChange'];
};


export interface ItemsList {
    value:string;
    label:string;
}

