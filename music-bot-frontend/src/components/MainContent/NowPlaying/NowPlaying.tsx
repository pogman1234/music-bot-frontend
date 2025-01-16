import { useContext } from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { AppContext } from '../../../AppContent'; // Import AppContext
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const NowPlaying = () => {
  const { state } = useContext(AppContext);
  const theme = useTheme();

  // Access the current track from the context
  const currentTrack = state.currentTrack;

  return (
    <Card sx={{ mb: 2, display: 'flex', alignItems: 'center', backgroundColor: theme.palette.mode === 'dark' ? '#282c34' : '#e0e0e0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <MusicNoteIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      </Box>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {currentTrack ? currentTrack.title : 'Nothing Playing'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {currentTrack ? currentTrack.artist : ''} {/* Display artist if available */}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          {currentTrack ? `Source: ${currentTrack.source}` : ''} {/* Display source if available */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NowPlaying;