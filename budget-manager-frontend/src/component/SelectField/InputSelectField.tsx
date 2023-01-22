import {
    FormControl,
    FormLabel,
    Typography,
    MenuItem,
    Select,
} from '@mui/material';
import React from 'react';
import { InputSelectFieldProps } from './InputSelectField.d';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InputSelectField = (props: InputSelectFieldProps) => {
    return (
        <React.Fragment>
            <FormControl id={props.id} style={props.inputFieldContainerStyle}>
                <FormLabel id={`${props.id}-label`}>
                    <Typography component="span" variant="body1">
                        {props.label}
                    </Typography>
                    <div>
                        <Select
                            id={`${props.id}-text-field`}
                            name={`${props.name}-text-field`}
                            labelId={`${props.id}-label`}
                            value={props.value}
                            onChange={props.onChange}
                            onBlur={props.onBlur}
                            style={props.style}
                            variant="outlined"
                            inputProps={{
                                maxLength: props.maxLength,
                                fullwidth: "true",
                                autoComplete: "off"
                              }}
                            IconComponent={ExpandMoreIcon}>
                            {props.itemsList &&
                                props.itemsList.length > 0 &&
                                props.itemsList.map((item, index) => {
                                    return (
                                        <MenuItem
                                            value={item.value}
                                            key={`dropdown-${index}`}
                                            id={`${props.id}-dll-item-${index}`}>
                                            {item.label}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </div>
                </FormLabel>
            </FormControl>
        </React.Fragment>
    );
};

export default InputSelectField;
