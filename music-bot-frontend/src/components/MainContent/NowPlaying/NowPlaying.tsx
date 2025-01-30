import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Box, Typography, Avatar, CircularProgress, LinearProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import { useTheme } from '@mui/material/styles';
import { PlayingData } from '../../../types/nowplaying';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDuration = (current: number, total: number): string => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return `${formatTime(current)}/${formatTime(total)}`;
};

const NowPlaying: React.FC<{ guildId: string }> = ({ guildId }) => {
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingData, setPlayingData] = useState<PlayingData | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const currentGuildRef = useRef<string>('');

  useEffect(() => {
    let mounted = true;
    let reconnectTimeout: number;

    const connectSSE = () => {
      // Don't reconnect if already connected to this guild
      if (currentGuildRef.current === guildId && eventSourceRef.current) {
        return;
      }

      // Clean up existing connection
      if (eventSourceRef.current) {
        console.log('[NowPlaying] Closing existing connection');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      console.log(`[NowPlaying] Connecting to guild ${guildId}`);
      const newEventSource = new EventSource(`${API_BASE_URL}/sse/currently_playing/${guildId}`);
      eventSourceRef.current = newEventSource;
      currentGuildRef.current = guildId;

      newEventSource.onopen = () => {
        if (!mounted) return;
        console.log('[NowPlaying] Connected');
        setLoading(false);
        setError(null);
      };

      newEventSource.onmessage = (event) => {
        if (!mounted) return;
        try {
          const data = JSON.parse(event.data);
          console.log('Received playing data:', data);
          setPlayingData(data);
        } catch (err) {
          console.error('Error parsing playing data:', err);
          setPlayingData(null);
        }
      };

      newEventSource.onerror = () => {
        if (!mounted) return;
        console.error('[NowPlaying] Connection error, attempting to reconnect...');
        setError('Connection error, attempting to reconnect...');
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
        reconnectTimeout = window.setTimeout(connectSSE, 5000);
      };
    };

    if (guildId) {
      connectSSE();
    }

    return () => {
      mounted = false;
      clearTimeout(reconnectTimeout);
      if (eventSourceRef.current) {
        console.log('[NowPlaying] Cleanup: closing connection');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [guildId]); // Remove eventSource from dependencies

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        Error: {error}
      </Typography>
    );
  }

  if (!playingData?.current_song) {
    return (
      <Card sx={{ backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[3] }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, gap: 2 }}>
            <MusicOffIcon sx={{ color: theme.palette.text.secondary, fontSize: '2rem' }} />
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
              No track currently playing
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[3] }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={playingData.current_song.thumbnail} 
            variant="square" 
            sx={{ width: 56, height: 56, marginRight: 2, boxShadow: theme.shadows[2] }} 
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
              {playingData.current_song.title}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
              {formatDuration(playingData.position, playingData.duration)}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(playingData.position / playingData.duration) * 100}
              sx={{
                backgroundColor: theme.palette.grey[800],
                height: 4,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.primary.main
                }
              }}
            />
          </Box>
          {playingData.is_playing ? (
            <PlayArrowIcon sx={{ color: theme.palette.primary.main }} />
          ) : (
            <PauseIcon sx={{ color: theme.palette.primary.main }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default NowPlaying;
