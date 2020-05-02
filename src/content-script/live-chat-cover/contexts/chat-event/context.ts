import { Dispatch, createContext } from 'react';
import { State, ChatEventAction } from './reducer';

export interface ChatEventContextValue {
    state: State;
    dispatch: Dispatch<ChatEventAction>;
}

export const ChatEventContext = createContext<ChatEventContextValue>({
    state: {
        chatItems: [],
    },
    dispatch: () => {},
});