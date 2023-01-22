import React , { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Link, Typography, FormControl, Box, Alert } from '@mui/material';
import {handleInputValue, setMode, handleClearForm} from './transferenceSlice';
import { TransferenceData
    , TransferenceProps
    , TransferProcessData} from './transference.d';
import { getAllAccountsList
    , getCurrencyByAccount
    , getAccountSummary
    , getExchangeRate
    , handleTransferenceCreate} from './transferenceSlice';
import BaseLayout from '../../component/Layout/BaseLayout';
import ActionButton from '../../component/Buttons/Button';
import InputField from '../../component/InputField/InputField';
import { usr_token } from '../../features/Person/personSlice';
import InputSelectField from '../../component/SelectField/InputSelectField';
import './transference.scss';

const AccTransference =(props: TransferenceProps)=>{


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const usrToken = useAppSelector(usr_token);

    {/** Security */}
    useEffect(() => {
        if(usrToken===""){
            navigate('/', { replace: true });
        }
    }, [usrToken]);


    /** If source accId changes then all fields needs to be refreshed */
    useEffect(()=>{

        dispatch(getAllAccountsList(null)); //source account list

        dispatch(getCurrencyByAccount( {accId:props.transfer.srcAccountData.accId, transfAccType: "SRC"} ));
        dispatch(getAccountSummary({accId:props.transfer.srcAccountData.accId, transfAccType: "SRC"}));


        dispatch(getCurrencyByAccount( {accId:props.transfer.dstAccountData.accId, transfAccType: "DST"} )); 

        dispatch(getExchangeRate(props.transfer.dstAccountData.curId));

    },[props.transfer.srcAccountData.accId
        , props.transfer.dstAccountData.accId
        , props.transfer.dstAccountData.curId]);

    /**
     * Clear formulary selections
     */
    const handleClearTransfer = ()=>{
        dispatch(handleClearForm(null));
    }

    /**
     * Perform transference
     */
    const handleTransferenceProcess = ()=>{

        const transferObjectData:TransferProcessData={
            srcAccount: {
                accId: props.transfer.srcAccountData.accId,
                curId: props.transfer.srcAccountData.curId,
                catId: '',
                typId:'2',
                trnAmount: props.transfer.srcAccountData.trnAmount,
                trnDescription: 'Transf. SRC (expense)' 
            },
            dstAccount: {
                accId: props.transfer.dstAccountData.accId,
                curId: props.transfer.dstAccountData.curId,
                catId: '',
                typId:'1',
                trnAmount: calculateExchangeRateAmount(props.transfer.srcAccountData.trnAmount),
                trnDescription: 'Transf. DST (income) - ExchRate: ' + props.transfer.transferExchangeRate   
            }
        };

        dispatch(handleTransferenceCreate(transferObjectData));
        
        console.log(transferObjectData);

        dispatch(handleClearForm(null));

    }

    function calculateExchangeRateAmount(transferAmount: string) {
        try {
            if (
                transferAmount !== '' &&
                transferAmount !== undefined &&
                props.transfer.transferExchangeRate !== ''
            ) {
                const exchRate = parseFloat(props.transfer.transferExchangeRate);
                const val = parseFloat(transferAmount);

                return (val * exchRate).toString();
            } else {
                return transferAmount;
            }
        } catch (error) {
            console.log(error);
            return transferAmount;
        }
    }

    return (

        <React.Fragment>
        <BaseLayout>
            <Grid id="transference-form-container-grid"
                container className="login-form-container">
                {/** PAGE TITLE */}
                <Typography variant="h2">Internal Account Transferences</Typography>

                <Grid container item id='transfer-main-grid' 
                    xs={12} sm={12} md={6} lg={6} xl={6} 
                    className="transfer-main-grid">
                
                    <Grid item id="transfer-source-account-container-grid"
                        /*style={{backgroundColor:'cyan'}}*/ >
                        
                       
                        <div id="source-account-input-div" className="field-item"> 
                             {/** Source banck account */}                                      
                            <InputSelectField id="src-account-number"
                                name="src-account-number"
                                label="Source account"
                                value={props.transfer.srcAccountData.accId}
                                style={{ width: '250px' }}
                                onChange={(e: any) =>
                                    props.handleInputValue({
                                        value: e.target.value,
                                        field: e.target.name,
                                    })
                                }
                                itemsList={props.transfer.ddlAccounts}
                            />  
                        </div>

                        { props.transfer.srcAccountData.accId!=='' && (
                            <React.Fragment>
                            <div id="currency-input-div" className="field-item">
                                {/** Source Currency Id field */}
                                <InputSelectField id="src-currency"
                                    name="src-currency"
                                    label="Source currency"
                                    value={props.transfer.srcAccountData.curId}
                                    style={{ width: '250px' }}
                                    onChange={(e: any) =>
                                        props.handleInputValue({
                                            value: e.target.value,
                                            field: e.target.name,
                                            })
                                        }
                                    itemsList={props.transfer.ddlSrcCurrencies}
                                /> 
                            </div>

                            <div id="src-acc-balance-input-div" className="field-item">
                                {/** Source account current balance */}
                                <InputField
                                    id="src-account-balance"
                                    name="src-account-balance"
                                    type="text"
                                    label="Current balance"
                                    value={props.transfer.srcAccountBalance}
                                    inputFieldContainerStyle={{ width: '150px' }}
                                />
                            </div>


                            <div id="src-amount-input-div" className="field-item">
                                {/** Source account current balance */}
                                <InputField
                                    id="src-amount-to-transfer"
                                    name="src-amount-to-transfer"
                                    type="text"
                                    label="Amount to transfer"
                                    value={props.transfer.srcAccountData.trnAmount}
                                    inputFieldContainerStyle={{ width: '150px' }}
                                    onChange={(e: any) =>
                                        props.handleInputValue({
                                            value: e.target.value,
                                            field: e.target.name,
                                        })
                                    }
                                />
                            </div>

                            </React.Fragment>
                        )}

                    </Grid>

                    <Grid item id="transfer-destination-account-container-grid">
                        <img id='transfer-img' 
                            src={`${process.env.PUBLIC_URL}/img/money-transfer.png`}
                            width='100px'
                            height='100px'
                            style={{padding:'25px 5px 25px 5px'}}/>
                    </Grid>

                    <Grid item id="transfer-destination-account-container-grid">
                        
                        { props.transfer.srcAccountData.accId!=='' && (
                            <React.Fragment>
                                
                                {/** Source bank account */}
                                <div id="destination-account-input-div" className="field-item">                                       
                                    <InputSelectField id="dst-account-number"
                                        name="dst-account-number"
                                        label="Destination account"
                                        value={props.transfer.dstAccountData.accId}
                                        style={{ width: '250px' }}
                                        onChange={(e: any) =>
                                            props.handleInputValue({
                                                value: e.target.value,
                                                field: e.target.name,
                                            })
                                        }
                                        itemsList={props.transfer.ddlAccounts.filter(
                                            data => data.value !== props.transfer.srcAccountData.accId
                                        )}
                                    />  
                                </div>

                                <div id="currency-input-div" className="field-item">
                                    {/** Source Currency Id field */}
                                    <InputSelectField id="dst-currency"
                                        name="dst-currency"
                                        label="Destination currency"
                                        value={props.transfer.dstAccountData.curId}
                                        style={{ width: '250px' }}
                                        onChange={(e: any) =>
                                            props.handleInputValue({
                                                value: e.target.value,
                                                field: e.target.name,
                                                })
                                            }
                                        itemsList={props.transfer.ddlDstCurrencies}
                                    /> 
                                </div>

                              
                                
                            </React.Fragment>
                        )}

                        {/** ACTION BUTTONS */}
                        { props.transfer.srcAccountData.trnAmount!=='' 
                        && props.transfer.dstAccountData.accId!==''
                        && parseInt(props.transfer.srcAccountBalance)>0
                        && ( 
                            <Box id="buttons-box" className="transfer-action-buttons-box">
                                <ActionButton
                                    id="transfer-cancel-button"
                                    name="transfer-cancel-button"
                                    renderBtnCancel={true}
                                    label="Clear"
                                    onClickAction={handleClearTransfer}
                                />

                                <ActionButton
                                    id="create-new-user-btn"
                                    name="create-new-user-btn"
                                    renderBtnOkSubmitNext={true}
                                    label="Proceed"
                                    onClickAction={handleTransferenceProcess}
                                />
                            </Box>
                        )}

                    </Grid> {/** END of destination account - column 2 */}

                </Grid>

                {/** DISPLAY MESSAGES */}
                {props.transfer.transSuccedeed!==null && (
                    <Box id="messages-display" style={{ paddingTop: '10px' }}>
                        { props.transfer.transSuccedeed && (
                            <Alert severity="success">
                                Transference performed successfully.
                            </Alert>
                        )}

                        {!props.transfer.transSuccedeed && (
                            <Alert severity="error">
                                Error, Transference failed!
                            </Alert>
                        )}
                    </Box>
                )}
                

              


            </Grid>
        </BaseLayout>
    </React.Fragment>

    );


};




const mapStateToProps =(state: RootState) =>({
    transfer : state.transferReducer,
});

export default connect(mapStateToProps,{
    handleInputValue,
    setMode,
    handleClearForm,
})(AccTransference);