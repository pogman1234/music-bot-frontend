import React from 'react';
import { useContext } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, useTheme } from '@mui/material';
import { AppContext } from '../../AppContent';

const Queue = () => {
  const { state } = useContext(AppContext);
  const theme = useTheme();
  const queue = state.queue;

  return (
    <List sx={{ width: '100%', bgcolor: theme.palette.background.paper }}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
        Queue
      </Typography>
      <Divider />
      {queue.map((track: any, index: any) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={track.title} src={track.thumbnail} /> {/* Display thumbnail if available */}
            </ListItemAvatar>
            <ListItemText
              primary={track.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {track.artist} {/* Display artist if available */}
                  </Typography>
                  {` - ${track.source}`} {/* Display source if available */}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
      {queue.length === 0 && (
        <Typography variant="body1" sx={{ p: 2 }}>
          The queue is empty.
        </Typography>
      )}
    </List>
  );
};

export default Queue;