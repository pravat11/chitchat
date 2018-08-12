import MessageStatus from '../../enum/MessageStatus';

interface SentMessage {
  message: string;
  username: string;
  timestamp: string;
  status?: MessageStatus;
}

export default SentMessage;
