import * as React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import { Field, reduxForm } from 'redux-form';
import { compose, withHandlers } from 'recompose';

import LoginPayload from '../domain/misc/LoginPayload';

interface LoginProps {
  handleSubmit: any;
  login: (payload: LoginPayload) => void;
  onSubmit: (formData: LoginPayload) => void;
}

const Login = (props: LoginProps) => (
  <form onSubmit={props.handleSubmit(props.onSubmit)}>
    <div className="login-form-wrapper">
      <Field className="login-form-element" name="username" component="input" type="text" placeholder="Username" />
      <Field className="login-form-element" name="password" component="input" type="password" placeholder="Password" />
      <input className="login-button" type="submit" value="Login" />
    </div>
  </form>
);

const mapDispatchToProps = {
  login
};

const enhance = compose<any, any>(
  reduxForm({
    form: 'messageForm'
  }),

  connect(
    null,
    mapDispatchToProps
  ),

  withHandlers({
    onSubmit: (props: LoginProps) => async (formData: LoginPayload) => {
      if (formData.username && formData.password) {
        try {
          props.login(formData);
        } catch (err) {
          return;
        }
      }
    }
  })
);

export default enhance(Login);
