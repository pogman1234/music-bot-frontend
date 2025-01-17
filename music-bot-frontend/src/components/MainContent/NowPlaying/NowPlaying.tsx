import React from 'react';
import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useTheme } from '@mui/material/styles';

interface CurrentSong {
  url: string;
  title: string;
  duration: number;
  thumbnail: string;
  filepath: string;
  is_downloaded: boolean;
  video_id: string;
}

interface NowPlayingProps {
  isPlaying: boolean;
  currentSong: CurrentSong;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ isPlaying, currentSong }) => {
  const theme = useTheme();

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            variant="rounded"
            src={currentSong.thumbnail}
            alt={currentSong.title}
            sx={{ width: 120, height: 90 }}
          />
          <Box>
            <Typography variant="h6" component="div">
              {currentSong.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              {isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
              <Typography variant="body2" color="text.secondary">
                {isPlaying ? "Playing" : "Paused"}
              </Typography>
            </Box>
            <Typography 
              component="a"
              href={currentSong.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                color: theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              View on YouTube
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NowPlaying;