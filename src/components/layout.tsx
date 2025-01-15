import React from 'react';

import Header from './Header';
import { Outlet } from 'react-router'
import Sidebar from './sidebar';
import Mainbar from './mainbar';
import Container from './Container';

const Layout = () => {
    return (
        <Container>
            <Sidebar />
            <Mainbar>
                <Header />
            </Mainbar>
        </Container>
    );
};

export default Layout;
