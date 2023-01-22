import React from 'react';
import BaseLayout from '../../component/Layout/BaseLayout';
import {HomeProps} from './home.d';


const Home =(props: HomeProps)=>{

    return (
        <React.Fragment>
            <BaseLayout>
                {props.children}
            </BaseLayout>
        </React.Fragment>

    );

}

export default Home;