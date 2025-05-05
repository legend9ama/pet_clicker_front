import { useState, useEffect } from 'react';
import api from '../../api';
import './Shop.scss';
import { formatNumber } from '../../utils/numbers';

export default function Shop() {
  const [farms, setFarms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
      const balanceRes = await api.get('/clicks');
      setBalance(balanceRes.data.clicks_count);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      }
    };
    loadData();
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % farms.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + farms.length) % farms.length);
  };

  useEffect(() => {
    const loadFarms = async () => {
      try {
        const response = await api.get('/admin/farms/visible');
        setFarms(response.data);
      } catch (error) {
        console.error('Failed to load farms:', error);
      }
    };
    
    loadFarms();
  }, []);

  const current_farm = farms[currentIndex] || {};
  
  const handlePurchase = async (farm_id) => {
    try {
      if (typeof farm_id !== 'number') {
        alert('Invalid farm ID:', farm_id);
        return;
      }
      await api.post('/farms/purchase', { "farm_id" : farm_id });
      alert('Farm purchased successfully!');
    } catch (error) {
      alert(`Purchase failed: ${error.response?.data?.detail || error.message}`);
    }
  };
  
  return (
    <div className="shop-container">
      <h1 className="page-title">Shop</h1>
      <div className="template-card">
        <img src={current_farm.image_url} alt={current_farm.name} />
        <h2>{current_farm.name}</h2>
        
        <div className="template-stats">
          <p>Price: {formatNumber(current_farm.base_price)} Pet Coins</p>
          <p>Base Income: {formatNumber(current_farm.base_income)} Pet Coins/h</p>
        </div>

        <button 
          onClick={() => handlePurchase(current_farm.farm_id)}
          className={`purchase-btn ${balance < current_farm.base_price ? 'disabled' : ''}`}
          disabled={balance < current_farm.base_price}
        >
          {balance < current_farm.base_price ? 'Not Enough Coins' : 'Purchase'}
        </button>
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