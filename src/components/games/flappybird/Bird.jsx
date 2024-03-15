import React from 'react';

const Bird = ({ top }) => {
  return (
    <div style={{
      position: 'absolute',
      top: `${top}px`,
      left: '50px', // Fixed horizontal position
      width: '30px',
      height: '30px',
      backgroundColor: 'yellow', // Simple square bird
    }} />
  );
};

export default Bird;
