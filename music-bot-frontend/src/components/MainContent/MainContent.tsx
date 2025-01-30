import { Container, Typography, Box } from '@mui/material';
import Queue from './Queue/Queue';
import NowPlaying from './NowPlaying/NowPlaying';

interface MainContentProps {
  guildId: string;
  guildName: string;
}

const MainContent: React.FC<MainContentProps> = ({ guildId, guildName }) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Poggy's Music Bot
        </Typography>

        <NowPlaying guildId={guildId} />
        <Queue guildId={guildId} guildName={guildName} />
      </Box>
    </Container>
  );
};

export default MainContent;