import React from 'react';
import BaseLayout from '../../component/Layout/BaseLayout';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './landing.scss';
import ActionButton from '../../component/Buttons/Button';

const LandingPage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login', { replace: true });
    };

    const goToRegister = () => {
        navigate('/newuser', { replace: true });
    };

    return (
        <React.Fragment>
            <BaseLayout>
                <Grid
                    id="landing-main-grid"
                    container
                    className="landing-grid-content">
                    <Box className="landing-box-1">
                        <Typography
                            variant="h1"
                            component="p"
                            className="landing-app-name">
                            Welcome to Budget Manager System
                        </Typography>
                        <Typography
                            variant="h3"
                            component="p"
                            className="landing-app-subtitle">
                            Your companion when managing income and expenses
                            easily and secure
                        </Typography>

                        <Typography
                            variant="h5"
                            component="p"
                            className="landing-app-instructions">
                            If you are already a registered user please click
                            Login, Otherwise please sign up Now!
                        </Typography>

                        <Box id='buttons-box' className="buttons-box">
                            <ActionButton
                                id="signup-button"
                                name="signup-button"
                                renderBtnOkSubmitNext2={true}
                                label="Sign Up"
                                onClickAction={goToRegister}
                            />

                            <ActionButton
                                id="login-button"
                                name="login-button"
                                renderBtnOkSubmitNext={true}
                                label="Login"
                                onClickAction={goToLogin}
                            />
                        </Box>
                    </Box>
                </Grid>
            </BaseLayout>
        </React.Fragment>
    );
};

export default LandingPage;
