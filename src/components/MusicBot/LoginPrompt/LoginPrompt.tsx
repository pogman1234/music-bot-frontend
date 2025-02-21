import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const loginUrl = `${API_BASE_URL}/auth/discord/login`;

const LoginPrompt: React.FC = () => {
  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Poggy's Music Bot
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please log in with Discord to access the features.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{
          mt: 2,
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
          },
        }}
      >
        Login with Discord
      </Button>
    </Box>
  );
};

export default LoginPrompt;