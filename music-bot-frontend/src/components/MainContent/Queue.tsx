import React, { useContext, useEffect, useState } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, CircularProgress } from '@mui/material';
import { AppContext } from '../../AppContent';
import { Track, QueueState } from '../../types/queue';

const API_BASE_URL = 'https://poggles-discord-bot-235556599709.us-east1.run.app';

const Queue: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/queue`);
      if (!response.ok) {
        throw new Error('Failed to fetch queue');
      }
      const data: QueueState = await response.json();
      // Extract just the tracks array from the queue state
      dispatch({ type: 'SET_QUEUE', payload: data.tracks });
      setError(null);
    } catch (err) {
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
    <List>
      {state.queue?.map((track: Track, index: number) => (
        <React.Fragment key={`${track.info.url}-${index}`}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={track.info.thumbnail} />
            </ListItemAvatar>
            <ListItemText
              primary={track.info.title}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {track.info.duration}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    Requested by: {track.requester}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {index < state.queue.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default Queue;
