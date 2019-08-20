import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { bind } from 'decko';
import showAlert from 'utils/showAlert';

import { getURLParam } from 'utils/helpers';

import AuthCenter from 'components/layouts/AuthCenter';

import './NewPassword.styl';

const FormItem = Form.Item;

@inject(({ userStore: { newPassword } }) => ({ newPassword }))
@observer
@withRouter
@Form.create({ name: 'newPasswordForm' })
class NewPasswordPage extends Component {
    static propTypes = {
        form: PropTypes.shape({
            validateFields: PropTypes.func.isRequired,
            getFieldDecorator: PropTypes.func.isRequired
        }),
        newPassword: PropTypes.func.isRequired
    };

    @bind
    handleSubmit(e) {
        e.preventDefault();

        const {
            form: { validateFields },
            newPassword: changePassword,
            history
        } = this.props;

        validateFields(async (err, values) => {
            if (!err) {
                const { newPassword, checkPassword } = values;

                if (newPassword !== checkPassword) {
                    showAlert({
                        content: 'Passwords do not match',
                        status: 'warning'
                    });
                } else {
                    const success = await changePassword({
                        password: newPassword,
                        token: getURLParam('token')
                    });

                    if (success) {
                        history.push('/sign-in');
                    }
                }
            }
        });
    }

    render() {
        const {
            form: { getFieldDecorator }
        } = this.props;

        return (
            <AuthCenter>
                <Form
                    onSubmit={this.handleSubmit}
                    className="new-password-form"
                >
                    <h1>New password</h1>

                    <FormItem>
                        {getFieldDecorator('newPassword', {
                            rules: [
                                {
                                    required: true,
                                    message:
                                        'Please input a correct password (min 8 symbols)',
                                    min: 8
                                }
                            ]
                        })(
                            <Input
                                size="large"
                                type="password"
                                placeholder="New password"
                            />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('checkPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input a correct password'
                                }
                            ]
                        })(
                            <Input
                                size="large"
                                type="password"
                                placeholder="Confirm password"
                            />
                        )}
                    </FormItem>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="new-password-form__submit-btn"
                    >
                        Change
                    </Button>
                </Form>
            </AuthCenter>
        );
    }
}

export default NewPasswordPage;
