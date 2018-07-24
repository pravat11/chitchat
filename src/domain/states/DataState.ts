export interface ChatMessage {
  message: string;
  timestamp: string;
  self: boolean;
}

interface DataState {
  chatHistory: ChatMessage[];
  isSending: boolean;
  error: any;
}

export default DataState;
