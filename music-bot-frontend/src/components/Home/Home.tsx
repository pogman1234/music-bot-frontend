import React from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import HomeHeader from './HomeHeader';

const Home: React.FC = () => (
  <>
    <HomeHeader />
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h1" gutterBottom>Pogs Tools</Typography>
    </Box>

    <Box sx={{ padding: '1rem 2rem', textAlign: 'left' }}>
      <Typography variant="h2" gutterBottom>Discord Music Bot</Typography>
    </Box>
    
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 2rem 2rem 2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h3" gutterBottom>Frontend</Typography>
          <Divider sx={{ marginBottom: '1rem' }} />
          
          <Typography variant="h4" gutterBottom>Vite</Typography>
          <Typography variant="body1" paragraph>
            Vite is being used as the frontend build tool. It is a new build tool that aims to provide a faster and leaner development experience for modern web projects.
          </Typography>
          
          <Typography variant="h4" gutterBottom>Typescript</Typography>
          <Typography variant="body1">
            Typescript is a superset of JavaScript that adds static type definitions. It is being used to provide type safety and better tooling for the frontend code.
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h3" gutterBottom>Backend</Typography>
          <Divider sx={{ marginBottom: '1rem' }} />
          
          <Typography variant="h4" gutterBottom>Uvicorn</Typography>
          <Typography variant="body1" paragraph>
            Uvicorn is a lightning-fast ASGI server implementation.
          </Typography>
          
          <Typography variant="h4" gutterBottom>FastAPI</Typography>
          <Typography variant="body1" paragraph>
            FastAPI is a modern, fast (high-performance), web framework for building APIs.
          </Typography>
          
          <Typography variant="h4" gutterBottom>Discord.py</Typography>
          <Typography variant="body1" paragraph>
            Discord.py is a Python library for interacting with the Discord API. It provides an easy way to create bots and automate tasks on Discord.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </>
);

export default Home;