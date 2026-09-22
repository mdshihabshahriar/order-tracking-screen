import { useState, useEffect } from 'react';
import { IconCheck } from './Icons';

export default function Toast({ message, onDone }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHiding(true);
      setTimeout(onDone, 200);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="toast-container">
      <div className={`toast ${hiding ? 'hide' : ''}`}>
        <IconCheck size={14} />
        {message}
      </div>
    </div>
  );
}
