import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useTheme } from '@mui/material/styles';
import { AppContext } from '../../../AppContent';


const API_BASE_URL = 'https://poggles-discord-bot-235556599709.us-east1.run.app';

const NowPlaying: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const theme = useTheme();
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentTrack = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/currently-playing`);
      if (!response.ok) {
        throw new Error('Failed to fetch current track');
      }
      const data = await response.json();
      if (data.song) {
        dispatch({ type: 'SET_CURRENT_TRACK', payload: data.song });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  useEffect(() => {
    // Fetch initially
    fetchCurrentTrack();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchCurrentTrack, 5000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ mb: 2, display: 'flex', alignItems: 'center', backgroundColor: theme.palette.mode === 'dark' ? '#282c34' : '#e0e0e0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <MusicNoteIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      </Box>
      <CardContent>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              {state.currentTrack ? state.currentTrack.info.title : 'Nothing Playing'}
            </Typography>
            <Typography variant="caption" color="text.secondary" component="div">
              {state.currentTrack ? `Source: ${state.currentTrack.info.url}` : ''}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NowPlaying;