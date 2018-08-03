import * as React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Field, reduxForm, reset } from 'redux-form';

import { sendMessage } from '../actions/messages';

interface MessageFormProps {
  handleSubmit: any;
  reset: (formName: string) => void;
  onSubmit: (formData: any) => void;
  sendMessage: (message: string, timestamp: string) => void;
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

const mapDispatchToProps = {
  reset,
  sendMessage
};

const enhance = compose<any, any>(
  connect(
    null,
    mapDispatchToProps
  ),

  reduxForm({
    form: 'messageForm'
  }),

  withHandlers({
    onSubmit: (props: MessageFormProps) => async (formData: any) => {
      if (formData.message) {
        const timestamp = new Date().toUTCString();

        try {
          props.sendMessage(formData.message, timestamp);
        } catch (err) {
          return;
        }

        props.reset('messageForm');
      }
    }
  })
);

export default enhance(MessageForm);
