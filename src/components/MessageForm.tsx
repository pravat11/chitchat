import * as React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Field, reduxForm, reset } from 'redux-form';

import { getUsername } from '../services/user';
import AppState from '../domain/states/AppState';
import { sendMessage } from '../actions/messages';
import SentMessagePayload from '../domain/response/SentMessage';

interface MessageFormProps {
  username: string;
  handleSubmit: any;
  reset: (formName: string) => void;
  onSubmit: (formData: any) => void;
  sendMessage: (payload: SentMessagePayload) => void;
}

const MessageForm = (props: MessageFormProps) => (
  <form onSubmit={props.handleSubmit(props.onSubmit)}>
    <div className="chat-form clearfix" id="messageForm">
      <div className="pull-left width-80">
        <Field name="message" type="text" component="input" className="chat-input" />
      </div>
      <div className="pull-right width-20">
        <input type="submit" className="button" value="Send" />
      </div>
    </div>
  </form>
);

const mapStateToProps = (state: AppState) => ({
  username: getUsername(state.session.data)
});

const mapDispatchToProps = {
  reset,
  sendMessage
};

const enhance = compose<any, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  reduxForm({
    form: 'messageForm'
  }),

  withHandlers({
    onSubmit: (props: MessageFormProps) => async (formData: any) => {
      if (formData.message) {
        const timestamp = new Date().toISOString();
        const sendMessagePayload = {
          timestamp,
          username: props.username,
          message: formData.message
        };

        try {
          props.sendMessage(sendMessagePayload);
        } catch (err) {
          return;
        }

        props.reset('messageForm');
      }
    }
  })
);

export default enhance(MessageForm);
