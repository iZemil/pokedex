import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { bind } from 'decko';

import { passwordRegex, loginRegex } from 'utils/constants/regex';

import AuthCenter from 'components/layouts/AuthCenter';

import './Join.styl';

const FormItem = Form.Item;

@inject('userStore')
@observer
@withRouter
@withTranslate
@Form.create({ name: 'registrationForm' })
class JoinPage extends Component {
    static propTypes = {
        userStore: PropTypes.shape({
            createNewUser: PropTypes.func.isRequired
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
            userStore: { createNewUser },
            history,
            trans
        } = this.props;

        validateFields(async (err, values) => {
            if (!err && values.agreement) {
                const successRegistration = await createNewUser(values);

                if (successRegistration) {
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
                <Form onSubmit={this.handleSubmit} className="join-form">
                    <h1>{trans('Registration')}</h1>

                    <FormItem>
                        {getFieldDecorator('login', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    required: true,
                                    message: trans(
                                        'Please input a correct login'
                                    ),
                                    pattern: loginRegex
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
                        {getFieldDecorator('email', {
                            validateTrigger: 'onBlur',
                            rules: [
                                {
                                    type: 'email',
                                    message: trans(
                                        'The input is not valid E-mail'
                                    )
                                },
                                {
                                    required: true,
                                    message: trans('Please input your E-mail')
                                }
                            ]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="mail" />}
                                placeholder="E-mail"
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
                                        'Please input your Password'
                                    ),
                                    pattern: passwordRegex
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
                        {getFieldDecorator('agreement', {
                            required: true,
                            valuePropName: 'checked',
                            initialValue: true
                        })(
                            <Checkbox>
                                {trans('I have read and agree with')}{' '}
                                <a href="#terms">
                                    {trans('Terms and Conditions')}
                                </a>
                            </Checkbox>
                        )}
                    </FormItem>

                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="join-form__submit-btn"
                        >
                            {trans('Register')}
                        </Button>
                    </FormItem>

                    <div className="join-form__bottom-row">
                        {trans('Already have an account?')}{' '}
                        <Link to="/sign-in">{trans('Sign in')}</Link>
                    </div>
                </Form>
            </AuthCenter>
        );
    }
}

export default JoinPage;
