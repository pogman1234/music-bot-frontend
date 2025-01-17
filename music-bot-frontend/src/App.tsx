import { Box, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from './AppContent';
import MainContent from './components/MainContent/MainContent';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            height: '100vh',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            gap: '2rem'
          }}
        >
          <MainContent />
        </Box>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;