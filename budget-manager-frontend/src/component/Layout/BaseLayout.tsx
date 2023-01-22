import React from 'react';
import {  BaseLayoutProps } from './BaseLayout.d';
import Footer from './Footer';
import Header from './Header';

const Base = (props: BaseLayoutProps) => {
    return (
        <React.Fragment>
            <main aria-labelledby="mainArea" id="mainArea">
                <Header />
                {props.children}
                <Footer />
            </main>
        </React.Fragment>
    );
};

export default Base;
