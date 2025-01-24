export interface Duration {
  current: number;
  total: number;
  formatted: string;
}

export interface CurrentSong {
  id: string;
  title: string;
  duration: number;
  thumbnail: string;
  webpage_url: string;
  is_downloaded: boolean;
  filepath: string;
  error: string;
  timestamp: number;
}

export interface PlayingData {
  isPlaying: boolean;
  currentSong: CurrentSong;
  duration: Duration;
  error: string | null;
  timestamp: number;
}