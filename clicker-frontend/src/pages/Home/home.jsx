import { useState, useEffect, useCallback  } from 'react';
import api from '../../api';
import './Home.scss';
import { formatNumber } from '../../utils/numbers';

const DEBOUNCE_TIME = 5000;
const BURST_TIME = 20000;

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [pendingClicks, setPendingClicks] = useState(0);
  const [clickSessionStart, setClickSessionStart] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    api.get('/users/me')
      .then(res => setUserData(res.data))
      .catch(console.error);
  }, []);
  
  const sendClicks = useCallback(async (amount) => {
    try {
      const response = await api.post('/clicks/increment', {
        amount: amount,
        source: 'manual'
      });
      setPendingClicks(0);
      setBalance(response.data.clicks_count);
    } catch (error) {
      console.error('Failed to send clicks:', error);
    }
  }, []);
  
  const handleClick = () => {
    const now = Date.now();
    
    setPendingClicks(prev => prev + 1);
    setLastClickTime(now);

    if (!clickSessionStart) {
      setClickSessionStart(now);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/clicks');
        const initialBalance = Number(response.data.clicks_count);
        setBalance(initialBalance);
        setPendingClicks(0);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      } finally {
      setIsLoading(false);
      }
    };
    
    fetchBalance();
  }, []);

  useEffect(() => {
    let debounceTimer;
    let burstTimer;

    const checkConditions = () => {
    const timeSinceLastClick = Date.now() - lastClickTime;
    const sessionDuration = Date.now() - clickSessionStart;

    if (timeSinceLastClick >= DEBOUNCE_TIME && pendingClicks > 0) {
      sendClicks(pendingClicks);
      resetTimers();
    }

    if (sessionDuration >= BURST_TIME && pendingClicks > 0) {
      sendClicks(pendingClicks);
      resetTimers();
    }
  };
  const resetTimers = () => {
    setClickSessionStart(null);
    clearTimeout(debounceTimer);
    clearTimeout(burstTimer);
  };
  if (lastClickTime) {
    debounceTimer = setTimeout(checkConditions, DEBOUNCE_TIME);
    
    if (clickSessionStart) {
      const timeLeft = BURST_TIME - (Date.now() - clickSessionStart);
      burstTimer = setTimeout(checkConditions, Math.max(0, timeLeft));
    }
  }
  return () => {
    clearTimeout(debounceTimer);
    clearTimeout(burstTimer);
  };
}, [lastClickTime, clickSessionStart, pendingClicks, sendClicks]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="balance">Pet Coins: {formatNumber((balance || 0) + (pendingClicks || 0))}
      {pendingClicks > 0 && <span className="pending"> (+{pendingClicks})</span>}
      </div>
      <div className="click-container">
        <img 
          src="/pet.png" 
          alt="Pet" 
          className="click-image" 
          onClick={handleClick}
        />
      </div>
    </div>
  );
}