import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import { bind } from 'decko';

import AuthCenter from 'components/layouts/AuthCenter';

import './ResetPassword.styl';

const FormItem = Form.Item;

@inject(({ userStore: { resetPassword } }) => ({ resetPassword }))
@observer
@Form.create({ name: 'resetPasswordForm' })
class ResetPasswordPage extends Component {
    static propTypes = {
        form: PropTypes.shape({
            validateFields: PropTypes.func.isRequired,
            getFieldDecorator: PropTypes.func.isRequired
        }),
        resetPassword: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            linkWasSent: false
        };
    }

    @bind
    handleSubmit(e) {
        e.preventDefault();

        const {
            form: { validateFields },
            resetPassword
        } = this.props;

        validateFields(async (err, values) => {
            if (!err) {
                const success = await resetPassword(values);

                if (success) {
                    this.setState({
                        linkWasSent: true
                    });
                }
            }
        });
    }

    render() {
        const {
            form: { getFieldDecorator }
        } = this.props;
        const { linkWasSent } = this.state;

        return (
            <AuthCenter>
                <Form
                    onSubmit={this.handleSubmit}
                    className="reset-password-form"
                >
                    <h1>Reset password</h1>

                    {linkWasSent ? (
                        <strong>A link was sent.</strong>
                    ) : (
                        <Fragment>
                            <p>We will send a reset link on your E-mail</p>
                            <FormItem>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message:
                                                'The input is not valid E-mail'
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail'
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

                            <div className="reset-password-form__bottom-row">
                                <Link to="/sign-in">
                                    <Button htmlType="button">Cancel</Button>
                                </Link>

                                <Button type="primary" htmlType="submit">
                                    Send
                                </Button>
                            </div>
                        </Fragment>
                    )}
                </Form>
            </AuthCenter>
        );
    }
}

export default ResetPasswordPage;
