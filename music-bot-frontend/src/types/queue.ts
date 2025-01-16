export interface Track {
  title: string;
  url: string;
  duration?: string;
  thumbnail?: string;
}


  export interface QueueState {

    tracks: SongInfo[];
  
    currentPosition: number;
  
  }