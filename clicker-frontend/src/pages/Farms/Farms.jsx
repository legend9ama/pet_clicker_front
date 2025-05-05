import { useState, useEffect } from 'react';
import api from '../../api';
import './Farms.scss';
import { formatNumber } from '../../utils/numbers';

export default function Farms() {
  const [farms, setFarms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadFarms = async () => {
      try {
        const response = await api.get('/farms');
        setFarms(response.data);
      } catch (error) {
        console.error('Failed to load farms:', error);
      }
    };
    
    loadFarms();
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + farms.length) % farms.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(farms.length - 1, prev + 1));
  };

  if (farms.length === 0) {
    return <div className="no-farms">No farms available</div>;
  }

  const current_farm = farms[currentIndex] || {};

  const handleCollect = async (farmId) => {
    try {
      const response = await api.get(`/farms/${farmId}/collect`);
      alert(`Collected: ${response.data.collected} Pet Coins!`);
    } catch (error) {
      alert(`Collection failed: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleUpgrade = async (farmId) => {
    try {
      const response = await api.post(`/farms/${farmId}/upgrade`, { levels : 1 });
      alert(`Successfully upgraded Farm to the ${response.data.level} level!`);
    } catch (error) {
        console.error('Upgrade failed:', error);
        alert(`Collection failed: ${error.response?.data?.detail || error.message}`);
      }
  };

  return (
    <div className="farms-container">
      <h1 className="page-title">Your Farms</h1>
        <div className="farm-card">
          <img src={current_farm.image_url} alt={current_farm.name} />
          <h2>{current_farm.name} (Level {current_farm.level})</h2>
          
          <div className="farm-stats">
            <p>Income: {formatNumber(current_farm.current_income)}/h</p>
            <p>Upgrade Cost: {formatNumber(current_farm.current_upgrade_cost)}</p>
          </div>

          <div className="farm-actions">
            <button key={`${current_farm.farm_id}-collect`} onClick={() => handleCollect(current_farm.farm_id)} className="collect-btn">
              Collect
            </button>
            <button key={`${current_farm.farm_id}-upgrade`} onClick={() => handleUpgrade(current_farm.farm_id)} className="upgrade-btn">
              Upgrade
            </button>
          </div>
        </div>
        <div className="navigation-controls">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Previous
        </button>
        <span className="navigation-text">{currentIndex + 1} / {farms.length}</span>
        <button onClick={handleNext} disabled={currentIndex === farms.length - 1}>
          Next
        </button>
        </div>
      </div>
  );
}