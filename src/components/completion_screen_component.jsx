import React from 'react';


export default function CompletionScreen({ onRestart }) {
  return (
    <div className="completion-screen">
      <h2>���߂łƂ��������܂��I</h2>
      <p>You have mastered all the N4 vocabulary!</p>
      <button onClick={onRestart} className="restart-button">
        Start Over
      </button>
    </div>
  );
}
