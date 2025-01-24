import React, { useEffect, useState } from 'react';
import { QueueState, Track } from '../../../types/queue';
import './Queue.css'; // Import the CSS file

interface TrackData {
  url: string;
  title: string;
  duration: number;
  thumbnail: string;
  filepath: string;
  is_downloaded: boolean;
  video_id: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const Queue: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [queueData, setQueueData] = useState<QueueState>({ tracks: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let reconnectTimeout: number;

    const connectSSE = () => {
      console.log('[Queue] Attempting to connect...');
      const eventSource = new EventSource(`${API_BASE_URL}/sse/queue`);

      eventSource.onopen = () => {
        if (!mounted) return;
        setError(null);
        setLoading(false);
      };

      eventSource.onmessage = (event) => {
        if (!mounted) return;
        console.log('[Queue] Raw SSE data:', event.data);

        try {
          const parsedData = JSON.parse(event.data);
          console.log('[Queue] Parsed data:', parsedData);

          const tracks = parsedData.queue.map((trackData: TrackData) => ({
            info: {
              title: trackData.title,
              duration: trackData.duration,
              thumbnail: trackData.thumbnail,
              url: trackData.url
            }
          }));

          console.log('[Queue] Mapped tracks:', tracks);
          setQueueData({ tracks });

        } catch (err) {
          console.error('[Queue] Parse error:', err);
          setError('Failed to parse queue data');
          setLoading(false);
        }
      };

      eventSource.onerror = (err) => {
        if (!mounted) return;
        console.error('[Queue] SSE Error:', err);
        setError('SSE connection error');
        eventSource.close();

        reconnectTimeout = window.setTimeout(() => {
          if (mounted) {
            console.log('[Queue] Attempting to reconnect...');
            connectSSE();
          }
        }, 5000);
      };

      return eventSource;
    };

    const eventSource = connectSSE();

    return () => {
      console.log('[Queue] Cleanup - Component unmounting');
      mounted = false;
      window.clearTimeout(reconnectTimeout);
      eventSource.close();
    };
  }, []);

  console.log('[Queue] Rendering with:', {
    loading,
    tracksCount: queueData.tracks.length,
    error
  });

  return (
    <div className="queue-container">
      <div className="queue-status">
      </div>

      {error && (
        <div className="queue-error">
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="queue-loading">Loading queue...</div>
      ) : (
        <div>
          <h2 className="queue-header">Queue</h2>
          {queueData.tracks.length === 0 ? (
            <div className="queue-empty">Queue is empty</div>
          ) : (
            queueData.tracks.map((track: Track, index: number) => (
              <div
                key={`${track.info.title}-${index}`}
                className="queue-track-item"
              >
                {track.info.thumbnail && (
                  <img
                    src={track.info.thumbnail}
                    alt={track.info.title}
                    className="queue-track-thumbnail"
                  />
                )}
                <div className="queue-track-info">
                  <div className="queue-track-title">{track.info.title}</div>
                  <div className="queue-track-duration">
                    Duration: {formatDuration(track.info.duration)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Queue;