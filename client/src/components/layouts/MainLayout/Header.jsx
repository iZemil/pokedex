import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import './MainLayout.styl';

function Header({ userStore: { isAuth } }) {
    return (
        <div className="main-layout__header">
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                {isAuth ? (
                    <Link to="/profile">Profile</Link>
                ) : (
                    <a href={`http://${location.hostname}:8080/auth/github`}>
                        <Icon type="github" /> GitHub login
                    </a>
                )}
            </div>
        </div>
    );
}

export default inject('userStore')(observer(Header));
