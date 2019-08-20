import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import { bind } from 'decko';

import { withTranslate } from 'components/Localization';
import AuthCenter from 'components/layouts/AuthCenter';

import './Login.styl';

const FormItem = Form.Item;

@inject('userStore')
@observer
@withRouter
@withTranslate
@Form.create({ name: 'loginForm' })
class LoginPage extends Component {
    static propTypes = {
        userStore: PropTypes.shape({
            loginUser: PropTypes.func.isRequired
        }).isRequired,
        form: PropTypes.shape({
            validateFields: PropTypes.func.isRequired,
            getFieldDecorator: PropTypes.func.isRequired
        })
    };

    @bind
    handleSubmit(e) {
        e.preventDefault();

        const {
            form: { validateFields },
            userStore: { loginUser },
            history
        } = this.props;

        validateFields(async (err, values) => {
            if (!err) {
                const successLogin = await loginUser(values);

                if (successLogin) {
                    history.push('/private');
                }
            }
        });
    }

    render() {
        const {
            form: { getFieldDecorator },
            trans
        } = this.props;

        return (
            <AuthCenter>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h1>{trans('Sign in')}</h1>

                    <FormItem>
                        {getFieldDecorator('login', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: trans('Please input your login'),
                                    min: 4
                                }
                            ]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="user" />}
                                placeholder={trans('Login')}
                            />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('password', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: trans(
                                        'Please input a correct password'
                                    ),
                                    min: 8
                                }
                            ]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder={trans('Password')}
                            />
                        )}
                    </FormItem>

                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="login-form__submit-btn"
                        >
                            {trans('Sign in')}
                        </Button>
                    </FormItem>

                    <div className="login-form__bottom-row">
                        <Link to="/join">{trans('Register now!')}</Link>
                        <Link to="/reset-password">
                            {trans('Forgot password')}
                        </Link>
                    </div>
                </Form>
            </AuthCenter>
        );
    }
}

export default LoginPage;
