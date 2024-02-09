// Avatar.js
import React from 'react';
import { useAuth } from './AuthContext';

const Avatar = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: 'purple',
        color:'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {user ? user.charAt(0).toUpperCase() : '?'}
    </div>
  );
};

export default Avatar;

