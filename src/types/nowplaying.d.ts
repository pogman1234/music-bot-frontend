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
}
export interface PlayingData {
    guild_id: number;
    is_playing: boolean;
    current_song: CurrentSong | null;
    progress: string;
    position: number;
    duration: number;
    error: string | null;
    timestamp: number;
}
