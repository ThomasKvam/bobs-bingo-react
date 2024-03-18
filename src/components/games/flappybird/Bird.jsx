
const Bird = ({ top }) => {
  return (
    <div style={{
      position: 'absolute',
      top: `${top}px`,
      left: '50px', // Fixed horizontal position
      width: '30px',
      height: '30px',
      //backgroundColor: 'yellow', // Simple square bird
    }} >
        <img src="src/assets/flappy.png" alt="Bird" style={{ width: '150%', height: '150%', objectFit: 'contain' }} />
    </div>
  );
};

export default Bird;
