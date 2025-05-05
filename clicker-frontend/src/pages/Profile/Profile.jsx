import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './Profile.scss';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    api.get('/users/me')
      .then(res => setUserData(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="profile-page">
      <h1 className="page-title">Player Profile</h1>
      
      {userData && (
        <div className="profile-card">
          <div className="info-item">
            <span className="label">Telegram ID:</span>
            <span className="value">{userData.telegram_id}</span>
          </div>
          <div className="info-item">
            <span className="label">First name:</span>
            <span className="value">{userData.first_name}</span>
          </div>
          <div className="info-item">
            <span className="label">Last name:</span>
            <span className="value">{userData.last_name}</span>
          </div>
          <div className="info-item">
            <span className="label">Username:</span>
            <span className="value">@{userData.username}</span>
          </div>
          <div className="info-item">
            <span className="label">Joined:</span>
            <span className="value">
              {new Date(userData.created_at * 1000).toLocaleDateString()}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Referrals:</span>
            <span className="value">{userData.referrals_count}</span>
          </div>
        </div>
      )}
      <Link to="/leaderboard" className="rating-button">
        View Leaderboard
      </Link>
      
    </div>
  );
}