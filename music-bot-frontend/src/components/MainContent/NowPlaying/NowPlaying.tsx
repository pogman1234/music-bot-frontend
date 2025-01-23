import React, { useEffect, useState } from 'react';
import { Card, CardContent, Box, Typography, Avatar, CircularProgress } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useTheme } from '@mui/material/styles';
import { NowPlayingProps } from '../../../types/nowplaying';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NowPlaying: React.FC<NowPlayingProps> = ({ isPlaying, currentSong }) => {
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playingData, setPlayingData] = useState<NowPlayingProps>({ 
    isPlaying: isPlaying,
    currentSong: currentSong 
  });

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/sse/currently-playing`);

    eventSource.onopen = () => {
      setLoading(false);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const data: NowPlayingProps = JSON.parse(event.data);
        setPlayingData(data);
      } catch (error) {
        setError('Failed to parse SSE data');
        console.error('Failed to parse SSE data', error);
      }
    };

    eventSource.onerror = () => {
      setError('SSE connection error');
      setPlayingData({ isPlaying, currentSong });
      setLoading(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [isPlaying, currentSong]);

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
          <Box>
            <Typography variant="h6" color={theme.palette.text.primary}>
              {playingData.currentSong.title}
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              {formatDuration(playingData.currentSong.duration)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NowPlaying;
