export interface SongInfo {
    title: string;
    url: string;
    thumbnail?: string;
    duration: string;
    author: string;
}

export interface Track {
  info: {
    title: string;
    url: string;
    thumbnail?: string;
    duration: string;
    author: string;
  };
  requester: string;
}

export interface QueueState {
  tracks: Track[];
  currentTrack?: Track;
  isPlaying: boolean;
  volume: number;
}
