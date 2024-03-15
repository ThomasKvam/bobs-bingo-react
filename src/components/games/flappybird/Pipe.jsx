import React from 'react';

const Pipe = ({ top, left, height }) => {
  return (
    <div style={{
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      width: '60px', // Width of the pipe, matching the pipeWidth variable in Game
      height: `${height}px`, // Height of the pipe, determined by the game logic
      backgroundColor: 'green',
      border: '2px solid darkgreen',
      boxSizing: 'border-box',
    }} />
  );
};

export default Pipe;
