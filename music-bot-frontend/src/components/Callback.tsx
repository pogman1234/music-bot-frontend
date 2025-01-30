import React, { useEffect, useState } from 'react';
import { User, Guild } from '../types/User';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Callback: React.FC<{ onAuth: (user: User, guilds: Guild[]) => void }> = ({ onAuth }) => {
  const [isAuthComplete, setIsAuthComplete] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    if (code && !isAuthComplete) {
      // Exchange code for token through backend
      fetch(`${API_BASE_URL}/auth/discord/callback?code=${code}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          if (data.user && data.guilds) {
            onAuth(data.user, data.guilds);
            setIsAuthComplete(true);
            // Clear URL parameters and redirect to home
            window.history.replaceState({}, document.title, '/');
          }
        })
        .catch(error => {
          console.error('Authentication error:', error);
        });
    }
  }, [onAuth, isAuthComplete]);

  return null;
};

export default Callback;