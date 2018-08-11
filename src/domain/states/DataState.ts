import Friend from '../response/Friend';
import SentMessage from '../response/SentMessage';

interface DataState {
  friends: Friend[];
  chatHistory: SentMessage[];
}

export default DataState;
