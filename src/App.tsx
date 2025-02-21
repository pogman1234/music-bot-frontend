import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AboutMe from './components/AboutMe/AboutMe';
import Home from './components/Home/Home';
import MusicBotPage from './components/MusicBot/MusicBotPage';

import './App.css';

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

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/music-bot" element={<MusicBotPage />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;