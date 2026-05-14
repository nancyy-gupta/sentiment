import React from 'react';

function SentimentBadge({ sentiment }) {
  const colors = {
    Good: '#22c55e',
    Bad: '#ef4444',
    Neutral: '#f59e0b',
  };

  return (
    <span
      style={{
        background: colors[sentiment],
        color: '#fff',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
      }}
    >
      {sentiment}
    </span>
  );
}

export default SentimentBadge;
