export interface SongInfo {
    title: string;
    url: string;
    thumbnail?: string;
    duration: string;
    author: string;
}

export interface TrackInfo {
  url: string;
  title: string;
  duration: number;
  thumbnail: string;
}

export interface Track {
  info: TrackInfo;
  isPlaying?: boolean;
}

export interface QueueState {
  tracks: Track[];
}
