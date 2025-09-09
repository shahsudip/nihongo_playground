import React from 'react';

// This simple component wraps any text you give it
// to protect it from being automatically translated.
const JapaneseText = ({ children }) => {
  return (
    <span className="notranslate" lang="ja">
      {children}
    </span>
  );
};

export default JapaneseText;