import { Container, Typography, Box } from '@mui/material';
import Queue from './Queue';
import NowPlaying from './NowPlaying/NowPlaying';
import { useState, useEffect } from 'react';
import { CurrentSong } from '../../types/nowplaying.ts';


interface CurrentlyPlayingData {
  isPlaying: boolean;
  currentSong: CurrentSong;
}

const MainContent: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlayingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentlyPlaying = async () => {
    try {
      const response = await fetch('https://poggles-discord-bot-235556599709.us-east1.run.app/api/currently-playing');
      if (!response.ok) {
        throw new Error('Failed to fetch currently playing');
      }
      const data: CurrentlyPlayingData = await response.json();
      setCurrentlyPlaying(data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentlyPlaying();
    const interval = setInterval(fetchCurrentlyPlaying, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Poggy's Music Bot
        </Typography>

        {currentlyPlaying && (
          <NowPlaying 
            isPlaying={currentlyPlaying.isPlaying}
            currentSong={currentlyPlaying.currentSong}
          />
        )}

        {!currentlyPlaying && (
          <NowPlaying 
            isPlaying={false}
            currentSong={{
              url: '',
              title: loading ? 'Loading...' : error || 'No song playing',
              duration: 0,
              thumbnail: '',
              filepath: '',
              is_downloaded: false,
              video_id: ''
            }}
          />
        )}

        <Box sx={{ 
          backgroundColor: 'background.paper',
          borderRadius: 1,
          p: 2,
          boxShadow: 1
        }}>
          <Queue />
        </Box>
      </Box>
    </Container>
  );
};

export default MainContent;