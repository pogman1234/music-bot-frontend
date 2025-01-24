import React, { useEffect, useState } from 'react';
import { Card, CardContent, Box, Typography, Avatar, CircularProgress, LinearProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useTheme } from '@mui/material/styles';
import { PlayingData, CurrentSong, Duration } from '../../../types/nowplaying';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDuration = (current: number, total: number): string => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return `${formatTime(current)}/${formatTime(total)}`;
};

const NowPlaying: React.FC<PlayingData> = ({ isPlaying, currentSong }) => {
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingData, setPlayingData] = useState<{
    isPlaying: boolean;
    currentSong: CurrentSong;
    duration: Duration;
  }>({ 
    isPlaying,
    currentSong,
    duration: { current: 0, total: 0, formatted: '0:00/0:00' }
  });

  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/sse/currently-playing`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setPlayingData(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError('Failed to parse SSE data');
        console.error('Failed to parse SSE data', error);
      }
    };

    eventSource.onerror = () => {
      setError('SSE connection error');
      setLoading(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const progress = playingData.duration.total > 0 
    ? (playingData.duration.current / playingData.duration.total) * 100 
    : 0;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" m={2}>
        {error}
      </Typography>
    );
  }

  if (!playingData.currentSong) {
    return (
      <Typography color="textSecondary" m={2}>
        No song currently playing
      </Typography>
    );
  }

  return (
    <Card sx={{
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create(['transform', 'box-shadow']),
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[4],
      },
      margin: theme.spacing(2)
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={theme.spacing(2)}>
          <Avatar
            src={playingData.currentSong.thumbnail}
            alt={playingData.currentSong.title}
            sx={{ width: 56, height: 56 }}
          />
          {playingData.isPlaying ? (
            <PauseIcon sx={{ color: theme.palette.primary.main }} />
          ) : (
            <PlayArrowIcon sx={{ color: theme.palette.primary.main }} />
          )}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" color={theme.palette.text.primary}>
              {playingData.currentSong.title}
            </Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{
                  height: 4,
                  borderRadius: 2,
                  mb: 0.5,
                  backgroundColor: theme.palette.grey[800],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette.primary.main,
                  }
                }}
              />
              <Typography variant="body2" color={theme.palette.text.secondary}>
                {playingData.duration.formatted || formatDuration(playingData.duration.current, playingData.duration.total)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NowPlaying;
