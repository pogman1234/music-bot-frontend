import React, { ReactNode } from 'react';
import { Track } from './types/queue';
interface AppState {
    queue: Track[];
    currentTrack: Track | null;
    volume: number;
    currentPosition: number;
}
type AppAction = {
    type: 'SET_QUEUE';
    payload: Track[];
} | {
    type: 'SET_POSITION';
    payload: number;
} | {
    type: 'SET_CURRENT_TRACK';
    payload: Track | null;
} | {
    type: 'ADD_TO_QUEUE';
    payload: Track;
} | {
    type: 'REMOVE_FROM_QUEUE';
    payload: number;
} | {
    type: 'SET_VOLUME';
    payload: number;
};
export declare const AppContext: React.Context<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}>;
export declare const AppProvider: React.FC<{
    children: ReactNode;
}>;
export {};
