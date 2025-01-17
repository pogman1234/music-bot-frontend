export interface SongInfo {
    title: string;
    url: string;
    thumbnail?: string;
    duration: string;
    author: string;
}

interface Track {

  title: string;

  url: string;

  thumbnail: string;

  duration: number;

  isPlaying: boolean;

}


export interface QueueState {
  tracks: Track[];
}
