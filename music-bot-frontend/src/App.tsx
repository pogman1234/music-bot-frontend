import { Box, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from './AppContent';
import MainContent from './components/MainContent/MainContent';

// Create a custom theme (optional, you can customize it further)
const theme = createTheme({
  palette: {
    mode: 'dark', // You can change to 'light' if desired
    primary: {
      main: '#90caf9', // Example primary color
    },
    secondary: {
      main: '#f48fb1', // Example secondary color
    },
  },
});

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <MainContent />
        </Box>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;