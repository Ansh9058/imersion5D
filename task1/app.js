import { useState } from 'react';
import './App.css'; // Optional if you want to keep styles separately

export default function App() {
  const [bars, setBars] = useState([]);

  const addProgressBar = () => {
    const id = Date.now(); // Unique ID
    setBars([...bars, id]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={addProgressBar}>Add</button>

      <div style={{ marginTop: '20px' }}>
        {bars.map((id) => (
          <ProgressBar key={id} />
        ))}
      </div>
    </div>
  );
}

function ProgressBar() {
  const [fill, setFill] = useState(0);

  // Start animation on mount
  useState(() => {
    setTimeout(() => {
      setFill(100);
    }, 50); // Short delay to trigger CSS transition
  }, []);

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#eee',
        borderRadius: '5px',
        overflow: 'hidden',
        marginBottom: '10px',
        height: '20px',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${fill}%`,
          backgroundColor: '#4caf50',
          transition: 'width 2s linear',
        }}
      />
    </div>
  );
}
