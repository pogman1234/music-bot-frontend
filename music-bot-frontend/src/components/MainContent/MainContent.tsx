import { Container, Typography, Box } from '@mui/material';
import Queue from './Queue';
import NowPlaying from './NowPlaying/NowPlaying';

const MainContent = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Poggy's Music Bot
        </Typography>

        <NowPlaying 
          isPlaying={false} // Replace with actual state
          currentSong={{
            url: '',
            title: 'No song playing',
            duration: 0,
            thumbnail: '',
            filepath: '',
            is_downloaded: false,
            video_id: ''
          }}
        />

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