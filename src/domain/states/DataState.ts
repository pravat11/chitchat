export interface ChatMessage {
  message: string;
  timestamp: string;
  self: boolean;
}

interface DataState {
  chatHistory: ChatMessage[];
  isSending: {
    [key: string]: boolean;
  };
  error: {
    [key: string]: any;
  };
}

export default DataState;
