import * as React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Field, reduxForm, reset } from 'redux-form';

import AppState from '../domain/states/AppState';
import { sendMessage } from '../actions/messages';
import { getUsername, getUserId } from '../services/user';
import SentMessagePayload from '../domain/response/SentMessage';

interface MessageFormProps {
  username: string;
  userId: number;
  handleSubmit: any;
  friendshipId: number | null;
  reset: (formName: string) => void;
  onSubmit: (formData: any) => void;
  sendMessage: (senderUserId: number, friendshipId: number, payload: SentMessagePayload) => void;
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
  userId: getUserId(state.session.data),
  username: getUsername(state.session.data),
  friendshipId: state.ui.selectedFriendshipId
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
      const { userId, friendshipId } = props;

      if (formData.message && friendshipId) {
        const timestamp = new Date().toISOString();
        const sendMessagePayload = {
          timestamp,
          username: props.username,
          message: formData.message
        };

        try {
          props.sendMessage(userId, friendshipId, sendMessagePayload);
        } catch (err) {
          return;
        }

        props.reset('messageForm');
      }
    }
  })
);

export default enhance(MessageForm);
