import React, {useEffect} from 'react';
import { DashboardProps } from './dashboard.d';
import { handleInputValue, getAllAccounts } from './dashboardSlice';
import { Box, Grid, Link, Paper, Table, TableBody
    , TableCell, TableContainer, TableHead
    , TableRow, Typography } from '@mui/material';
import BaseLayout from '../../component/Layout/BaseLayout';
import { RootState } from '../../app/store';
import {connect } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { usr_token } from '../../features/Person/personSlice';
import {accountList} from '../../features/Account/accountSlice';
import { useNavigate } from 'react-router-dom';
import './dashboard.scss';

const Dashboard = (props: DashboardProps) => {
    const navigate = useNavigate();
    const usrToken = useAppSelector(usr_token);
    const accountsCollection = useAppSelector(accountList);
    const dispatch = useAppDispatch();

    /*
   useEffect(()=>{
        dispatch(getAllAccounts(null));
   },[accountsCollection]);
*/


    useEffect(() => {
        if(usrToken==="") {
            navigate('/login', { replace: true });
        }else {
            dispatch(getAllAccounts(null));
        }
    }, [usrToken]);

    const goToTransferences =()=>{
        navigate('/transference', { replace: true });
    }

    const goToTransaction =()=>{
        navigate('/transaction', { replace: true });
    }



    return (
        <BaseLayout>
            <React.Fragment>
                <Grid
                    container
                    id="app-main-dashboard-grid"
                    className="login-form-container">
                    <Typography variant="h2">
                        Budget Manager Dashboard
                    </Typography>


                    <Grid container item
                        md={10}
                        lg={10}
                        id="data-container"
                        
                        className="data-container">
                        <Box id="data-container-box" >

                       
                            <TableContainer id="data-table-container" component={Paper}
                             style={{height:'550px'}}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                Account Owner
                                            </TableCell>
                                            <TableCell align="center">
                                                Bank Name
                                            </TableCell>
                                            <TableCell align="center">
                                                Account Number
                                            </TableCell>
                                            <TableCell align="center">
                                                Account Balance
                                            </TableCell>
                                            <TableCell align="center">
                                                Currency
                                            </TableCell>
                                            <TableCell align="center">
                                                Last Update
                                            </TableCell>
                                            <TableCell align="center">
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {props.dashb.accList.length > 0 &&
                                            props.dashb.accList.map(
                                                (item, index) => {
                                                    return (
                                                        <TableRow
                                                            key={`data-row-${index}`}
                                                            sx={{'&:last-child td, &:last-child th':{border: 0,},}}>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.usrName }</Typography>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.bankName }</Typography>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.accNumber }</Typography>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='h4'>{ item.accBalance }</Typography>    
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='h4'>{ item.curName }</Typography> 
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography variant='subtitle2'>{ item.accLastUpdate }</Typography>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Link id={`del-data-row-${index}`}
                                                                   onClick={goToTransferences}   >
                                                                Transference
                                                                </Link>
                                                                &nbsp;|&nbsp;
                                                                <Link
                                                                    id={`upd-data-row-${index}`}
                                                                    onClick={goToTransaction}
                                                                    >
                                                                    Transaction
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                            )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                       

                        </Box>
                    </Grid>

                    
                </Grid>
            </React.Fragment>
        </BaseLayout>
    );
};


const mapStateToProps = (state:RootState) =>({
    dashb: state.dashboardReducer
});

export default connect(mapStateToProps,{
    handleInputValue,
})(Dashboard);
