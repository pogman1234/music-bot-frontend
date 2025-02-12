import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomeHeader: React.FC = () => (
  <AppBar position="sticky" sx={{ top: 0, width: '100%' }}>
    <Toolbar>
      <Typography variant="h6" color="inherit" sx={{ flexGrow: 1}} component={Link} to="/">
        poggy
      </Typography>
      <Button color="inherit" component={Link} to="/music-bot">
        Music Bot
      </Button>
      <Button color="inherit" component={Link} to="/about-me">
        About Me
      </Button>
    </Toolbar>
  </AppBar>
);

export default HomeHeader;