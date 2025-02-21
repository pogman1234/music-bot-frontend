export interface SongInfo {
    title: string;
    url: string;
    thumbnail?: string;
    duration: string;
    author: string;
}
export interface TrackInfo {
    id: string;
    title: string;
    duration: number;
    thumbnail: string;
    webpage_url: string;
    is_downloaded: boolean;
    filepath: string | null;
}
export interface Track {
    info: TrackInfo;
    isPlaying?: boolean;
}
export interface QueueState {
    tracks: Track[];
}
