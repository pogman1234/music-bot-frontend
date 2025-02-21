import { ReactNode } from 'react';
export interface AppState {
    isLoading: boolean;
    error: string | null;
    data: unknown;
}
export type AppAction = {
    type: 'SET_LOADING';
    payload: boolean;
} | {
    type: 'SET_ERROR';
    payload: string;
} | {
    type: 'SET_DATA';
    payload: unknown;
};
export declare const initialState: AppState;
export declare const AppContext: import("react").Context<{
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}>;
export declare const AppContextProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
