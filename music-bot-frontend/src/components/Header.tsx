import React, { useState, useEffect } from 'react';
import { User, Guild } from '../types/User';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Generate login URL from backend to keep client_id secret
const loginUrl = `${API_BASE_URL}/auth/discord/login`;

const Header: React.FC<{ 
  user: User | null; 
  guilds: Guild[]; 
  onGuildChange: (guildId: string) => void 
}> = ({ user, guilds, onGuildChange }) => {
  const [selectedGuild, setSelectedGuild] = useState<string>('');

  useEffect(() => {
    if (guilds.length > 0 && !selectedGuild) {
      setSelectedGuild(guilds[0].id);
      onGuildChange(guilds[0].id);
    }
  }, [guilds, selectedGuild, onGuildChange]);

  const handleGuildChange = (event: SelectChangeEvent<string>) => {
    const guildId = event.target.value as string;
    setSelectedGuild(guildId);
    onGuildChange(guildId);
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' }}>
      <FormControl variant="outlined" style={{ minWidth: 200 }}>
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
      <div>
        {user ? (
          user.global_name
        ) : (
          <a href={loginUrl} style={{ color: '#fff', textDecoration: 'none' }}>
            Login with Discord
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;