import React, { useContext, useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, CircularProgress, Paper } from '@mui/material';
import { AppContext } from '../../AppContent';

interface QueueItem {
  url: string;
  title: string;
  duration: number;
  thumbnail: string;
  filepath: string;
  is_downloaded: boolean;
  video_id: string;
}

interface QueueResponse {
  queue: QueueItem[];
}

const API_BASE_URL = 'https://poggles-discord-bot-235556599709.us-east1.run.app';

const Queue: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/queue`);
      if (!response.ok) {
        throw new Error(`Failed to fetch queue: ${response.statusText}`);
      }
      
      const data: QueueResponse = await response.json();
      dispatch({ 
        type: 'SET_QUEUE', 
        payload: data.queue.map(item => ({
          info: {
            url: item.url,
            title: item.title,
            thumbnail: item.thumbnail,
            duration: item.duration
          }
        }))
      });
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper 
      sx={{ 
        padding: 2,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Typography 
        variant="h5" 
        component="h2"
        sx={{ 
          fontWeight: 700,
          marginBottom: 3,
          textAlign: 'center',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        Queue
      </Typography>
      <List>
        {state.queue?.map((track, index) => (
          <React.Fragment key={`${track.info.url}-${index}`}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={track.info.thumbnail} />
              </ListItemAvatar>
              <ListItemText
                primary={track.info.title}
                secondary={
                  <Typography component="span" variant="body2" color="textSecondary">
                    Duration: {track.info.duration} seconds
                  </Typography>
                }
              />
            </ListItem>
            {index < state.queue.length - 1 && <Divider />}
          </React.Fragment>
        ))}
        {(!state.queue || state.queue.length === 0) && (
          <Typography variant="body1" align="center" sx={{ py: 2 }}>
            Queue is empty
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default Queue;
