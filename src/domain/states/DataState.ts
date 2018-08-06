import SentMessage from '../response/SentMessage';

interface DataState {
  chatHistory: SentMessage[];
  isSending: {
    [key: string]: boolean;
  };
  error: {
    [key: string]: any;
  };
}

export default DataState;
