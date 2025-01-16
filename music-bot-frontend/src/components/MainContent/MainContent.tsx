import { Container, Typography } from '@mui/material';
import Queue from './Queue';
import NowPlaying from './NowPlaying/NowPlaying'; // Import with correct path

const MainContent = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Poggy's Music Bot
      </Typography>

      {/* Now Playing Section */}
      <NowPlaying />

      {/* Queue Section */}
      <Queue />
    </Container>
  );
};

export default MainContent;