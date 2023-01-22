import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Link, Typography, FormControl, Box, Alert } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TransactionProps, TransactionData } from './transaction.d';
import { handleInputValue, setMode
    , getAllAccountsList
    , getCurrencyByAccount
    , getAllCategoriesList
    , getTransactionTypes
    , handleTransactionCreation } from './transactionSlice';
import BaseLayout from '../../component/Layout/BaseLayout';
import ActionButton from '../../component/Buttons/Button';
import InputField from '../../component/InputField/InputField';
import { usr_token } from '../../features/Person/personSlice';
import InputSelectField from '../../component/SelectField/InputSelectField';


const Transaction = (props: TransactionProps) => {

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

    useEffect(()=>{
        dispatch(getAllAccountsList(null));
        dispatch(getCurrencyByAccount(props.trans.transData.accId));
        dispatch(getAllCategoriesList(null));
        dispatch(getTransactionTypes(null));
    },[ props.trans.mode, props.trans.transData.accId]);


    const displayAddTransactionForm = () => {
        setDisplaySuccess(false);
        dispatch(setMode('Create')); //Form to be set in CREATE mode
    };

    const handleCreateNewTransaction =()=>{
        console.log('Attempting to create a new transaction');
        const data: TransactionData = {
            accId: props.trans.transData.accId,
            curId: props.trans.transData.curId,
            catId: props.trans.transData.catId,
            typId: props.trans.transData.typId,
            trnAmount: props.trans.transData.trnAmount,
            trnDescription: props.trans.transData.trnDescription
        };
        dispatch(handleTransactionCreation(data));
        setDisplaySuccess(true);
    };


    return (
        <React.Fragment>
            <BaseLayout>
                <Grid id="transaction-form-container-grid"
                    container
                    className="login-form-container">
                    {/** PAGE TITLE */}
                    <Typography variant="h2">Transactions Management</Typography>


                    {/** FORMULARY */}
                    <FormControl>
                        {
                           (props.trans.mode === 'Create' ||
                                props.trans.mode === 'Update') && (
                               
                               <React.Fragment>
                                    {/** Account Id field */}
                                    <div id="account-input-div" className="field-item">                                       
                                        <InputSelectField id="account-number"
                                            name="account-number"
                                            label="Select Account"
                                            value={props.trans.transData.accId}
                                            style={{ width: '350px' }}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            itemsList={props.trans.ddlAccounts}
                                        />  
                                    </div>


                                {props.trans.transData.accId!=='' && (
                                    <React.Fragment>
                                    <div id="currency-input-div" className="field-item">
                                        {/** Currency Id field */}
                                        <InputSelectField id="currency"
                                                name="currency"
                                                label="Account Currency"
                                                value={props.trans.transData.curId}
                                                style={{ width: '350px' }}
                                                onChange={(e: any) =>
                                                    props.handleInputValue({
                                                        value: e.target.value,
                                                        field: e.target.name,
                                                    })
                                                }
                                                itemsList={props.trans.ddlCurrencies}
                                        /> 
                                    </div>

                                    <div id="category-input-div" className="field-item">
                                        {/** Transaction category field */}
                                        <InputSelectField id="currency"
                                            name="category"
                                            label="Transaction Category"
                                            value={props.trans.transData.catId}
                                            style={{ width: '350px' }}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            itemsList={props.trans.ddlCategories}
                                        /> 
                                    </div>

                                    <div id="tran-type-input-div" className="field-item">
                                        {/** Transaction type field */}
                                        <InputSelectField id="tran-type"
                                            name="tran-type"
                                            label="Transaction Type"
                                            value={props.trans.transData.typId}
                                            style={{ width: '350px' }}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            itemsList={props.trans.ddlTranTypes}
                                        /> 
                                    </div>

                                    <div id="tran-amount-input-div" className="field-item">
                                        {/** Transaction amount field */}
                                        <InputField id="tran-amount"
                                            name="tran-amount"
                                            type="text"
                                            label="Amount"
                                            style={{ width: '350px' }}
                                            value={props.trans.transData.trnAmount}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.trans.errorField}
                                        />
                                    </div>

                                    <div id="tran-description-input-div" className="field-item">
                                        {/** Transaction amount field */}
                                        <InputField id="tran-description"
                                            name="tran-description"
                                            type="text"
                                            label="Description"
                                            style={{ width: '350px' }}
                                            value={props.trans.transData.trnDescription}
                                            onChange={(e: any) =>
                                                props.handleInputValue({
                                                    value: e.target.value,
                                                    field: e.target.name,
                                                })
                                            }
                                            error={props.trans.errorField}
                                        />
                                    </div>

                                    </React.Fragment>
                                )}
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
                            /*onClickAction={hideAddBankForm}*/
                        />

                        {
                            /*addBank*/ props.trans.mode === 'Create' && (
                                <ActionButton
                                    id="save-bank-button"
                                    name="save-bank-button"
                                    renderBtnOkSubmitNext2={true}
                                    label="Save transaction"
                                    onClickAction={handleCreateNewTransaction}
                                />
                            )
                        }

                        {
                            /*!addBank*/ props.trans.mode === 'Display' && (
                                <ActionButton
                                    id="add-bank-button"
                                    name="add-bank-button"
                                    renderBtnOkSubmitNext={true}
                                    label="Add new transaction"
                                    onClickAction={displayAddTransactionForm}
                                />
                            )
                        }

                        {props.trans.mode === 'Update' && (
                            <ActionButton
                                id="update-bank-button"
                                name="update-bank-button"
                                renderBtnOkSubmitNext2={true}
                                label="Update transaction"
                                /*onClickAction={handleBankDataUpdate}*/
                            />
                        )}
                    </Box>


                </Grid>
            </BaseLayout>
        </React.Fragment>
    );
};


const mapStateToProps =(state: RootState) =>({
    trans : state.transactionReducer,
});

export default connect(mapStateToProps,{
    handleInputValue,
    setMode,
})(Transaction);