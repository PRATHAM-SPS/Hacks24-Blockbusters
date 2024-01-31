import React from 'react';

const Loading = () => {
  return (
    <div className="loading-container"
    style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
      <div className="spinner-border text-primary"
       role="status"
       style={{ width: '3rem', height: '3rem' }}
       >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p style={{ fontSize: '24px', marginLeft: '10px', color: '#000' }}>Loading...</p>
    </div>
  );
};

export default Loading;
