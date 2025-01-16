import React, { createContext, useReducer, ReactNode } from 'react';

// Define the shape of a track object
interface Track {
  title: string;
  artist?: string;
  source?: string;
  thumbnail?: string;
  url: string;
}

// Define the shape of your application state
interface AppState {
  currentTrack: Track | null;
  queue: Track[];
  volume: number;
  currentPosition: number;
  // Add other state properties as needed
}

// Action types
type AppAction = 
  | { type: 'SET_QUEUE'; payload: Track[] }
  | { type: 'SET_POSITION'; payload: number }
  | { type: 'SET_CURRENT_TRACK'; payload: Track | null }
  | { type: 'ADD_TO_QUEUE'; payload: Track }
  | { type: 'REMOVE_FROM_QUEUE'; payload: number } // index of track to remove
  | { type: 'SET_VOLUME'; payload: number };

// Initial state
const initialState: AppState = {
  currentTrack: null,
  queue: [],
  volume: 0.5,
  currentPosition: 0,
};

// Create the context
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return { ...state, currentTrack: action.payload };
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.payload] };
    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter((_, index) => index !== action.payload),
      };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_QUEUE':
      return { ...state, queue: action.payload };
    case 'SET_POSITION':
      return { ...state, currentPosition: action.payload };
    default:
      return state;
  }
};

// Context provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};