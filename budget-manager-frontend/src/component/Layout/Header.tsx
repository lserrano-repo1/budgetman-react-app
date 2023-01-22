import {AppBar,Toolbar,Box,
    styled,AppBarProps,Grid,
    Link,Typography,} from '@mui/material';
import Menu from '../Menu/Menu';
import React, { useEffect } from 'react';
import { usr_token, isAuthenticated, salutation
    , lastName, handleUserLogOut
    , handleInputValue,} from '../../features/Person/personSlice';
import './style.scss';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { connect } from 'react-redux';

import { PersonProps } from '../../features/Person/person.d';
import { useNavigate } from 'react-router-dom';


const Header = (props:PersonProps) => {
    const usrToken = useAppSelector(usr_token);
    const isUserAuthenticated = useAppSelector(isAuthenticated);
    const userSalutation = useAppSelector(salutation);
    const userLastName = useAppSelector(lastName);

    const navigate = useNavigate();
   
    useEffect(() => {
        //TODO: verify how to handle this validation
        /*
        if(usrToken===""){
            navigate('/login', { replace: true });
        }
        */
    }, [usrToken]);
    
 

    const AppBarStyled = styled(AppBar)<AppBarProps>(({ theme }) => ({
        boxShadow: 'none',
    }));


    return (
        <React.Fragment>
            <AppBarStyled
                id="header-appbar"
                role="banner"
                position="sticky"
                className="header-app-bar">
                <Toolbar
                    id="header-toolbar"
                    className="header-tool-bar"
                    style={{ padding: '0px' }}>
                    <Grid
                        container
                        id="header-main-grid"
                        className="header-main-grid">
                        <Grid
                            id="header-logo-grid"
                            item
                            xs={6}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}>
                            <img
                                id="application-logo"
                                className="logo-img"
                                alt={'application-logo'}
                                src={`${process.env.PUBLIC_URL}/img/LogoWithImage.png`}
                                width="125px"
                                height="75px"
                            />
                        </Grid>

                        <Grid
                            id="header-logged-profile-grid"
                            item
                            xs={6}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}>
                            <Box id="header-profile" className="header-profile">
                                {isUserAuthenticated && (
                                    <React.Fragment>
                                        <img
                                            id="user-logged-in-img"
                                            alt="user logged in"
                                            width="25px"
                                            height="25px"
                                            src={`${process.env.PUBLIC_URL}/img/loggedIn.png`}
                                        />
                                        {userSalutation.length > 0 &&
                                            userLastName.length > 0 && (
                                                <div>
                                                    Hello, {userSalutation}
                                                    {userLastName}
                                                </div>
                                            )}

                                        <Link id="user-log-uot-link" onClick={() => { 
                                                props.handleUserLogOut();}
                                                } 
                                            >
                                            <Typography variant="body2">
                                                Click to logout
                                            </Typography>
                                        </Link>
                                    </React.Fragment>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                   
                </Toolbar>
                 
            </AppBarStyled>
            {isUserAuthenticated && (<Menu />)}
        </React.Fragment>
    );
};


const mapStateToProps = (state:RootState)=>({
    person: state.personReducer,
});

export default connect(mapStateToProps,{
    handleInputValue,
    handleUserLogOut,
})(Header);



//export default Header;
