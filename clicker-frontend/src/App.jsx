import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home/home';
import Shop from './pages/Shop/Shop';
import Farms from './pages/Farms/Farms';
import Profile from './pages/Profile/Profile';
import Leaderboard from './pages/Profile/Leaderboard/Leaderboard';
import './index.scss';
import './styles/theme.scss'
import Navbar from './components/Navbar/Navbar'

function App() {
  useEffect(() => {
    const setTheme = () => {
      const webApp = window.Telegram?.WebApp;
      if (!webApp) return;

      const isDark = webApp.colorScheme === 'dark';
      const themeParams = webApp.themeParams;
      
      document.documentElement.style.setProperty('--bg-color', themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--text-color', themeParams.text_color || '#000000');
      document.documentElement.style.setProperty('--accent-color', themeParams.button_color || '#40a7e3');
      document.documentElement.style.setProperty('--button-text', themeParams.button_text_color || '#ffffff');
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };

    setTheme();
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      const themeHandler = () => setTheme();
      webApp.onEvent('themeChanged', themeHandler);
      return () => webApp.offEvent('themeChanged', themeHandler);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
      <div> 
      <Navbar />
      </div>
    </Router>
  );
}

export default App;