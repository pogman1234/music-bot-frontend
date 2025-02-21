import { JSX } from "react/jsx-runtime";
import { vi } from "vitest";
import { TrackInfo } from "../../../types/queue";
import { screen, waitFor } from '@testing-library/react';
import Queue from "./Queue";

describe('Queue', () => {
  const guildId = '12345';
  const guildName = 'Test Guild';

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ queue: [], error: null, timestamp: Date.now() }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state initially', () => {
    render(<Queue guildId={guildId} guildName={guildName} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders queue data correctly', async () => {
    const mockTrack: TrackInfo = {
        id: '1',
        title: 'Test Track',
        duration: 300,
        thumbnail: 'https://via.placeholder.com/120x90',
        webpage_url: "",
        is_downloaded: false,
        filepath: null
    };
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ queue: [mockTrack], error: null, timestamp: Date.now() }),
      })
    );

    render(<Queue guildId={guildId} guildName={guildName} />);
    await waitFor(() => expect(screen.getByText('Test Track')).toBeInTheDocument());
    expect(screen.getByText('5:00')).toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.reject('API is down'));
    render(<Queue guildId={guildId} guildName={guildName} />);
    await waitFor(() => expect(screen.getByText('Connection error, attempting to reconnect...')).toBeInTheDocument());
  });

  it('renders "No tracks in queue" when queue is empty', async () => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ queue: [], error: null, timestamp: Date.now() }),
      })
    );
    render(<Queue guildId={guildId} guildName={guildName} />);
    await waitFor(() => expect(screen.getByText('No tracks in queue')).toBeInTheDocument());
  });

  it('renders the correct guild name', () => {
    render(<Queue guildId={guildId} guildName={guildName} />);
    expect(screen.getByText(`Queue for ${guildName}`)).toBeInTheDocument();
  });
});

function render(_arg0: JSX.Element) {
  throw new Error("Function not implemented.");
}
