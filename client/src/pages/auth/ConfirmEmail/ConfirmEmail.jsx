import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';

import { getURLParam } from 'utils/helpers';

import './ConfirmEmail.styl';

@inject('userStore')
@withRouter
class ConfirmEmail extends Component {
    async componentDidMount() {
        const {
            userStore: { confirmEmail },
            history
        } = this.props;

        const token = getURLParam('token');
        await confirmEmail(token);

        history.push('/');
    }

    render() {
        return (
            <div className="confirm-email">
                <Spin tip="Email confirmation..." />
            </div>
        );
    }
}

export default ConfirmEmail;
