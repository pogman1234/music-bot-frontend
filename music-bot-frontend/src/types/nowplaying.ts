export interface CurrentSong {
  url: string;
  title: string;
  duration: number;
  thumbnail: string;
  filepath: string;
  is_downloaded: boolean;
  video_id: string;
}

export interface NowPlayingProps {
  isPlaying: boolean;
  currentSong: CurrentSong;
}