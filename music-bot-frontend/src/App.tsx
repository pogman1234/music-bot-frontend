import { useState, useEffect } from 'react';
import { Box, ThemeProvider, CircularProgress } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from './AppContent';
import MainContent from './components/MainContent/MainContent';
import Callback from './components/Callback';
import Header from './components/Header';
import { User, Guild } from './types/User';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<string>('');
  const [selectedGuildName, setSelectedGuildName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedGuilds = localStorage.getItem('guilds');

    if (storedUser && storedGuilds) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const parsedGuilds = JSON.parse(storedGuilds);
        if (parsedUser && parsedGuilds?.length > 0) {
          setUser(parsedUser);
          setGuilds(parsedGuilds);
          setSelectedGuild(parsedGuilds[0].id);
          setSelectedGuildName(parsedGuilds[0].name);
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('guilds');
      }
    }
    setIsLoading(false);
  }, []);

  const handleAuth = (newUser: User, newGuilds: Guild[]) => {
    if (!newUser || !newGuilds?.length) {
      console.error('Invalid auth data received');
      return;
    }

    setUser(newUser);
    setGuilds(newGuilds);
    setSelectedGuild(newGuilds[0].id);
    setSelectedGuildName(newGuilds[0].name);
    
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('guilds', JSON.stringify(newGuilds));
  };

  const handleGuildChange = (guildId: string) => {
    if (!guildId) return;
    const guild = guilds.find(g => g.id === guildId);
    if (guild) {
      setSelectedGuild(guildId);
      setSelectedGuildName(guild.name);
    }
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          bgcolor: 'background.default' 
        }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: 'background.default'
        }}>
          <Header 
            user={user} 
            guilds={guilds} 
            onGuildChange={handleGuildChange} 
          />
          <Box 
            component="main"
            sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem',
              gap: '2rem'
            }}
          >
            {!user ? (
              <Callback onAuth={handleAuth} />
            ) : selectedGuild ? (
              <MainContent guildId={selectedGuild} guildName={selectedGuildName} />
            ) : null}
          </Box>
        </Box>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;