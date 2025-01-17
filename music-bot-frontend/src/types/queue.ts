export interface SongInfo {
    title: string;
    url: string;
    thumbnail?: string;
    duration: string;
    author: string;
}

export interface Track {
  info: {
    url: string;
    title: string;
    duration: number;
    thumbnail: string;
  };
  requester: string;
}

export interface QueueState {
  tracks: Track[];
}
