import React from 'react';

import './button.scss';
import { Box, Button } from '@mui/material';
import { ButtonProps } from './Button.d';

const ActionButton = (props: ButtonProps) => {
    return (
        <React.Fragment>
          
                {/* Button OK, Submit or Next */}
                {props.renderBtnOkSubmitNext && (
                    <Box className='btnStyle'>
                        <Button
                            id={`${props.id}-ok`}
                            name={`${props.id}-ok`}
                            color="primary"
                            onClick={props.onClickAction}
                            disabled={props.buttonDisabled}
                            variant={props.buttonVariant}
                        >
                            {props.label}
                        </Button>
                    </Box>
                )}

                 {/* Button OK, Submit or Next */}
                 {props.renderBtnOkSubmitNext2 && (
                    <Box className='btnStyle'>
                        <Button
                            id={`${props.id}-ok2`}
                            name={`${props.id}-ok2`}
                            color="info"
                            onClick={props.onClickAction}
                            disabled={props.buttonDisabled}
                            variant={props.buttonVariant}
                        >
                            {props.label}
                        </Button>
                    </Box>
                )}

                {/** Button GO BACK */}
                {props.renderBtnGoBack && (
                    <Box className='btnStyle'>
                        <Button
                            id={`${props.id}-back`}
                            name={`${props.id}-back`}
                            color="secondary"
                            onClick={props.onClickAction}
                            disabled={props.buttonDisabled}
                            variant={props.buttonVariant}
                        >
                            {props.label}
                        </Button>
                    </Box>
                )}

                 {/** Button CANCEL */}
                 {props.renderBtnCancel && (
                    <Box className='btnStyle'>
                        <Button
                            id={`${props.id}-cancel`}
                            name={`${props.id}-cancel`}
                            color="warning"
                            onClick={props.onClickAction}
                            disabled={props.buttonDisabled}
                            variant={props.buttonVariant}
                        >
                            {props.label}
                        </Button>
                    </Box>
                )}
          
        </React.Fragment>
    );
};

export default ActionButton;
