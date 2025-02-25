import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/poggy_hero.png'; // Import the background image

const HomeHeader: React.FC = () => (
  <AppBar 
    position="sticky" 
    sx={{ 
      top: 0, 
      width: '100%', 
      height: '400px', // Adjust the height to fit the background image
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center' 
    }}
  >
    <Toolbar sx={{ justifyContent: 'flex-start' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography 
          variant="h6" 
          color="inherit" 
          component={Link} 
          to="/"
        >
          poggy
        </Typography>
        <Button color="inherit" component={Link} to="/about-me">
          About Me
        </Button>
        <Button color="inherit" component={Link} to="/music-bot">
          Music Bot
        </Button>
      </Box>
      </Toolbar>
  </AppBar>
);

export default HomeHeader;