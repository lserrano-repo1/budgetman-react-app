import { Typography } from '@mui/material';
import React from 'react';
import BaseLayout from '../../component/Layout/BaseLayout';


const NotFound = () =>{

    return (
        <React.Fragment>
             <BaseLayout>
             <div id="error404" style={{ display:'flex', justifyContent:'space-evenly', marginTop:'5%', marginBottom:'5%'}}>
                 <Typography variant='h1'>
                    404 
                </Typography>
             </div>
             <div id="error404" style={{ display:'flex', justifyContent:'space-evenly', marginTop:'5%', marginBottom:'5%'}}>
                 <Typography variant='h2'>
                    The requested page was not found
                </Typography>
             </div>
               
             </BaseLayout>
        </React.Fragment>
    )


}

export default NotFound;