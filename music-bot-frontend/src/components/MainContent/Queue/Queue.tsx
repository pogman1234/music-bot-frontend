import React, { useEffect, useState, useRef } from 'react';
import { TrackInfo } from '../../../types/queue';
import { CircularProgress, Alert, Box, Typography, Card} from '@mui/material';
import './Queue.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

interface QueueData {
  queue: TrackInfo[];
  error: string | null;
  timestamp: number;
}

const Queue: React.FC<{ guildId: string; guildName: string }> = ({ guildId, guildName }) => {
  const [queueData, setQueueData] = useState<QueueData>({ queue: [], error: null, timestamp: 0 });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const eventSourceRef = useRef<EventSource | null>(null);
  const currentGuildRef = useRef<string>('');

  useEffect(() => {
    let mounted = true;
    let reconnectTimeout: number;

    const connectSSE = () => {
      // Don't reconnect if already connected to this guild
      if (currentGuildRef.current === guildId && eventSourceRef.current) {
        return;
      }

      // Clean up existing connection
      if (eventSourceRef.current) {
        console.log('[Queue] Closing existing connection');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      console.log(`[Queue] Connecting to guild ${guildId}`);
      const newEventSource = new EventSource(`${API_BASE_URL}/sse/queue/${guildId}`);
      eventSourceRef.current = newEventSource;
      currentGuildRef.current = guildId;

      newEventSource.onopen = () => {
        if (!mounted) return;
        console.log('[Queue] Connected');
        setLoading(false);
        setError(null);
      };

      newEventSource.onmessage = (event) => {
        if (!mounted) return;
        try {
          const data = JSON.parse(event.data);
          console.log('Received queue data:', data);
          setQueueData(data);
        } catch (err) {
          console.error('Error parsing queue data:', err);
          setError('Error parsing queue data');
        }
      };

      newEventSource.onerror = () => {
        if (!mounted) return;
        console.error('[Queue] Connection error, attempting to reconnect...');
        setError('Connection error, attempting to reconnect...');
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
        reconnectTimeout = window.setTimeout(connectSSE, 5000);
      };
    };

    if (guildId) {
      connectSSE();
    }

    return () => {
      mounted = false;
      clearTimeout(reconnectTimeout);
      if (eventSourceRef.current) {
        console.log('[Queue] Cleanup: closing connection');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [guildId]); // Remove eventSource from dependencies

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Queue for {guildName}
      </Typography>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {queueData.queue?.length > 0 ? (
            queueData.queue.map((track: TrackInfo, index: number) => (
              <Card key={`${track.id}-${index}`} sx={{ display: 'flex', p: 1 }}>
                <img 
                  src={track.thumbnail} 
                  alt={track.title}
                  style={{ width: '120px', height: '90px', objectFit: 'cover' }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2, flex: 1 }}>
                  <Typography variant="subtitle1">{track.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDuration(track.duration)}
                  </Typography>
                </Box>
              </Card>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography color="text.secondary">No tracks in queue</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Queue;