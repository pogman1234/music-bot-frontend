import React, { useEffect } from 'react';
import { User, Guild } from '../../../types/User';
import { AppBar, Toolbar, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface MusicBotHeaderProps {
  user: User | null;
  guilds: Guild[];
  selectedGuild: string;
  onGuildChange: (guildId: string) => void;
}

const Header: React.FC<MusicBotHeaderProps> = ({ user, guilds, selectedGuild, onGuildChange }) => {
  useEffect(() => {
    if (guilds.length > 0 && !selectedGuild) {
      onGuildChange(guilds[0].id);
    }
  }, [guilds, selectedGuild, onGuildChange]);

  const handleGuildChange = (event: SelectChangeEvent<string>) => {
    const guildId = event.target.value as string;
    onGuildChange(guildId);
  };

  return (
    <AppBar position="sticky" sx={{ top: 0, width: '100%' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0.75rem' }}>
        <Typography variant="h6" color="inherit" component={Link} to="/" sx={{ marginRight: 'auto' }}>
          poggy
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <FormControl variant="outlined" sx={{ minWidth: 200, marginRight: '1rem' }}>
            <InputLabel id="guild-select-label">Select Guild</InputLabel>
            <Select
              labelId="guild-select-label"
              value={selectedGuild}
              onChange={handleGuildChange}
              label="Select Guild"
            >
              {guilds.map(guild => (
                <MenuItem key={guild.id} value={guild.id}>
                  {guild.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {user && (
            <Typography variant="body1" color="inherit">
              {user.global_name}
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;