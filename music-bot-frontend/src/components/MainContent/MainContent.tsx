import { Container, Typography, Box } from '@mui/material';
import Queue from './Queue/Queue';
import NowPlaying from './NowPlaying/NowPlaying';

const MainContent: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Poggy's Music Bot
        </Typography>

        <NowPlaying 
          isPlaying={false}
          currentSong={{
            id: '',
            title: '',
            duration: 0,
            thumbnail: '',
            webpage_url: '',
            is_downloaded: false,
            filepath: '',
            error: '',
            timestamp: 0
          }}
          duration={{
            current: 0,
            total: 0,
            formatted: '0:00/0:00'
          }}
          error={null}
          timestamp={0}
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