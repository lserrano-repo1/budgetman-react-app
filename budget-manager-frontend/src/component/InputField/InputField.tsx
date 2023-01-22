import { FormControl, FormLabel, Typography, TextField } from '@mui/material';
import React from 'react';
import { InputFieldProps } from './InputField.d';

const InputField = (props: InputFieldProps) => {
    return (
        <React.Fragment>
            <FormControl id={props.id} style={props.inputFieldContainerStyle}>
                <FormLabel id={`${props.id}-label`}>
                    <Typography component='span' variant='body1'>{props.label}</Typography>
                </FormLabel>
                <TextField
                    id={`${props.id}-text-field`}
                    name={`${props.id}-text-field`}
                    value={props.value}
                    type={props.type}
                    style={props.style}
                    variant='outlined'
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    
                />

            </FormControl>

        </React.Fragment>
    );
};

export default InputField;
