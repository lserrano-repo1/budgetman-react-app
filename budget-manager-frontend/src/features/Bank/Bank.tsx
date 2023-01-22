import React, { useEffect } from 'react';
import { BankProps, BankData } from './bank.d';
import { Grid, Link, Typography, FormControl, Box, Alert } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
//import UserLoginForm from '../Person/UserLoginForm';
import BaseLayout from '../../component/Layout/BaseLayout';
import ActionButton from '../../component/Buttons/Button';
import InputField from '../../component/InputField/InputField';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import {
    handleInputValue,
    setMode,
    handleBankCreation,
    getAllBanks,
    handleBankUpdate,
    getByBankId,
    deleteBankById,
} from './bankSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { usr_token } from '../../features/Person/personSlice';


const Bank = (props: BankProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    
    const usrToken = useAppSelector(usr_token);
    const [displaySuccess, setDisplaySuccess] = React.useState(false);
   
    {/** Security */}
    useEffect(() => {
        if(usrToken===""){
            navigate('/', { replace: true });
        }
    }, [usrToken]);
   
   
   
    useEffect(() => {
        dispatch(getAllBanks(null));
    }, [props.bank.mode, props.bank.bankData.bankId, displaySuccess]);


    const displayAddBankForm = () => {
        setDisplaySuccess(false);
        dispatch(setMode('Create')); //Form to be set in CREATE mode
    };

    const hideAddBankForm = () => {
        setDisplaySuccess(false);
        dispatch(setMode('Display')); //Form to be set in DISPLAY mode
    };

    const handleNewBank = () => {
        console.log('Attempting to create a new bank');
        const data: BankData = {
            bankName: props.bank.bankData.bankName,
            bankAddress: props.bank.bankData.bankAddress,
            bankContact: props.bank.bankData.bankContact,
            bankEmail: props.bank.bankData.bankEmail,
            bankId: '',
        };
        dispatch(handleBankCreation(data));
        setDisplaySuccess(true);
    };

    /** This retrieve data given a bank ID */
    const retrieveDataToUpdate = (props: BankData) => {
        console.log('Retrieving data...');
        console.log(props);

        const data: BankData = {
            bankId: props.bankId,
            bankName: props.bankName,
            bankAddress: props.bankAddress,
            bankContact: props.bankContact,
            bankEmail: props.bankEmail,
        };
        dispatch(getByBankId(data)); //Formulary will be set UPDATE mode
        setDisplaySuccess(false);
    };

    /**
     * UPDATE
     * @param props
     */
    const handleBankDataUpdate = () => {
        console.log('Updating data...');
        console.log(props);

        const data: BankData = {
            bankId: props.bank.bankData.bankId,
            bankName: props.bank.bankData.bankName,
            bankAddress: props.bank.bankData.bankAddress,
            bankContact: props.bank.bankData.bankContact,
            bankEmail: props.bank.bankData.bankEmail,
        };
        dispatch(handleBankUpdate(data));
        if (props.bank.bankData.bankId !== '') {
            setDisplaySuccess(true);
        }
    };

    /**
     * DELETE
     * @param props
     */
    const handleBankDataDelete = (props: BankData) => {
        console.log('Deleting data...');
        console.log(props);

        const data: BankData = {
            bankId: props.bankId,
            bankName: props.bankName,
            bankAddress: props.bankAddress,
            bankContact: props.bankContact,
            bankEmail: props.bankEmail,
        };
        dispatch( deleteBankById(data));
        dispatch( getAllBanks(null));
        setDisplaySuccess(true);
    };

    {
        /** USER INTERFACE */
    }
    return (
        <React.Fragment>
            <BaseLayout>
                <Grid
                    container
                    id="login-form-container-grid"
                    className="login-form-container">
                          {/** PAGE TITLE */}
                    <Typography variant="h2">Bank Management</Typography>

                    <FormControl>
                        {
                            /*addBank*/ (props.bank.mode === 'Create' ||
                                props.bank.mode === 'Update') && (
                                <React.Fragment>
                                    <div
                                        id="bank-name-input-div"
                                        className="field-item">
                                        <InputField
                                            id="bank-name"
                                            name="bank-name"
                                            type="text"
                                            label="Name"
                                            value={props.bank.bankData.bankName}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.bank.errorField}
                                        />
                                    </div>

                                    <div
                                        id="bank-address-input-div"
                                        className="field-item">
                                        <InputField
                                            id="bank-address"
                                            name="bank-address"
                                            type="text"
                                            label="Address"
                                            value={
                                                props.bank.bankData.bankAddress
                                            }
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.bank.errorField}
                                        />
                                    </div>

                                    <div
                                        id="bank-contact-input-div"
                                        className="field-item">
                                        <InputField
                                            id="bank-contact"
                                            name="bank-contact"
                                            type="text"
                                            label="Contact name"
                                            value={
                                                props.bank.bankData.bankContact
                                            }
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.bank.errorField}
                                        />
                                    </div>

                                    <div
                                        id="bank-contact-email-input-div"
                                        className="field-item">
                                        <InputField
                                            id="bank-contact-email"
                                            name="bank-contact-email"
                                            type="email"
                                            label="Contact email"
                                            value={
                                                props.bank.bankData.bankEmail
                                            }
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.bank.errorField}
                                        />
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </FormControl>

                    {/** DISPLAY MESSAGES */}
                    <Box id="messages-display" style={{ paddingTop: '10px' }}>
                        {displaySuccess && (
                            <Alert severity="success">
                                Action performed successfully.
                            </Alert>
                        )}
                    </Box>

                    {/** ACTION BUTTONS */}
                    <Box id="buttons-box" className="buttons-box">
                        <ActionButton
                            id="cancel-adding-bank-button"
                            name="cancel-adding-bank-button"
                            renderBtnCancel={true}
                            label="Cancel"
                            onClickAction={hideAddBankForm}
                        />

                        {
                            /*addBank*/ props.bank.mode === 'Create' && (
                                <ActionButton
                                    id="save-bank-button"
                                    name="save-bank-button"
                                    renderBtnOkSubmitNext2={true}
                                    label="Save new bank"
                                    onClickAction={handleNewBank}
                                />
                            )
                        }

                        {
                            /*!addBank*/ props.bank.mode === 'Display' && (
                                <ActionButton
                                    id="add-bank-button"
                                    name="add-bank-button"
                                    renderBtnOkSubmitNext={true}
                                    label="Add new bank"
                                    onClickAction={displayAddBankForm}
                                />
                            )
                        }

                        {props.bank.mode === 'Update' && (
                            <ActionButton
                                id="update-bank-button"
                                name="update-bank-button"
                                renderBtnOkSubmitNext2={true}
                                label="Update information"
                                onClickAction={handleBankDataUpdate}
                            />
                        )}
                    </Box>

                    {/** DATA TABLE */}
                    <div>
                        <Typography variant="subtitle2">
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                Bank Id
                                            </TableCell>
                                            <TableCell align="center">
                                                Bank Name
                                            </TableCell>
                                            <TableCell align="center">
                                                Bank Address
                                            </TableCell>
                                            <TableCell align="center">
                                                Contact
                                            </TableCell>
                                            <TableCell align="center">
                                                Email
                                            </TableCell>
                                            <TableCell align="center">
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {props.bank.banksList.length > 0 &&
                                            props.bank.banksList.map(
                                                (item, index) => {
                                                    return (
                                                        <TableRow
                                                            key={`data-row-${index}`}
                                                            sx={{'&:last-child td, &:last-child th':{border: 0,},}}>
                                                            <TableCell component="th" scope="row">
                                                                { item.bankId }
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                { item.bankName }
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                { item.bankAddress }
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                { item.bankContact }
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                { item.bankEmail }
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Link id={`del-data-row-${index}`}
                                                                    onClick={() => handleBankDataDelete(item)}   >
                                                                    Delete
                                                                </Link>
                                                                &nbsp;|&nbsp;
                                                                <Link
                                                                    id={`upd-data-row-${index}`}
                                                                    onClick={() => retrieveDataToUpdate(item)}>
                                                                    Update
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                            )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Typography>
                    </div>
                </Grid>
            </BaseLayout>
        </React.Fragment>
    );
};

const mapStateToProps = (state: RootState) => ({
    bank: state.bankReducer,
    person: state.personReducer,
});

export default connect(mapStateToProps, {
    handleInputValue,
    setMode,
})(Bank);


