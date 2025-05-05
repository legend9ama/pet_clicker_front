import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';
import { formatNumber } from '../../../utils/numbers';
import './Leaderboard.scss'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const res = await api.get('/users');
      setLeaderboard(res.data);
    };
    loadLeaderboard();
  }, []);

  return (
    <div className="leaderboard-page">
      <h1 className="page-title">Top Players</h1>
      
      <div className="leaderboard-list">
        {leaderboard.map(user => (
          <div key={user.telegram_id} className="leaderboard-item">
            <div className="left-section">
              <span className="position">#{user.position}</span>
              <img 
                alt="User avatar"
                src={user?.photo_url || '/default-avatar.png'} 
                className="avatar"
              />
              <span className="username">@{user.username}</span>
            </div>
            <div className="right-section">
              <span className="clicks">
                {formatNumber(user.clicks_count || 0)} Pet Coins
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link to="/profile" className="back-button">
        Back to Profile
      </Link>
    </div>
  );
}