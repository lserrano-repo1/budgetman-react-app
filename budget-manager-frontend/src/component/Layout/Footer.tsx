import React from 'react';
import {
    AppBar, AppBarProps, Box, Grid, styled, Toolbar
    , Typography, TypographyProps
} from '@mui/material';


const Footer =()=>{

    const AppBarStyled = styled(AppBar)<AppBarProps>(({ theme }) => ({
        backgroundColor: '#f5e5e5',
        boxShadow:'unset',
    }));

    const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
        fontWeight: '425',
        color: '#000000'
    }));

    return (
        <React.Fragment>
            <AppBarStyled id='footerAppBar' role='footer'
                className='footer-app-bar'
                sx={{ top: 'auto', bottom: 0 }} >

                <Toolbar id='footerToolBar' className='footer-tool-bar'>

                    <Grid id='footerContainerGrid' container >
                        <Grid id='creators-name' item xs={10} sm={10} md={10} lg={10} xl={10}>
                            <Box id='creators-name-box1' className='copyright-text'>
                                <TypographyStyled id='copyrightText' variant="body2"
                                    aria-label='LSerrano 2022'>
                                    &copy; LSerrano 2023
                                </TypographyStyled>
                            </Box>
                        </Grid>
                        <Grid id='copyrightItemGrid-2' item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <Box id='copyrightTextBox-2' className='copyright-text'>
                                <TypographyStyled id='versionText' variant="body2"
                                    aria-label='version 1.0.0'>
                                    v 1.0.0
                                </TypographyStyled>
                            </Box>
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBarStyled>
        </React.Fragment>
    );

}

export default Footer;