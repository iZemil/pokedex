import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import './MainLayout.styl';

const { Content } = Layout;

function MainLayout({ children }) {
    return (
        <Layout className="main-layout">
            {/* Header /> */}

            <Content className="main-layout__main">{children}</Content>
        </Layout>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default MainLayout;
