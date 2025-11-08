import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from "../firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";

// --- Define your sub-components ---
// These are styled by the new CSS in app_style.css

const SectionHeader = ({ text }) => {
  return <h2 className="section-header">{text}</h2>;
};

const AudioPlayer = ({ src }) => {
  return (
    <div className="audio-player">
      <iframe src={src} width="100%" height="70" allow="autoplay" title="Listening Audio"></iframe>
    </div>
  );
};

const ImageDisplay = ({ src }) => {
  return <img src={src} alt="Question visual" className="question-image" />;
};

const Passage = ({ htmlContent }) => {
  // Use dangerouslySetInnerHTML to render the saved HTML
  return (
    <div 
      className="passage-content" 
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};

const Question = ({ block }) => {
  return (
    <div className="question-block">
      <p className="question-text">{block.questionText}</p>
      <div className="options-list">
        {block.options.map((option, index) => (
          <div key={index} className="option">
            <label>
              <input type="radio" name={`question-${block.questionNumber}`} />
              {option}
            </label>
          </div>
        ))}
      </div>
      {/* You can add a button to show the transcript if it exists */}
      {block.transcript && (
        <details className="transcript-details">
          <summary>Show Transcript</summary>
          <pre>{block.transcript}</pre>
        </details>
      )}
    </div>
  );
};

// --- The Main Page Component ---

const TestTakerPage = () => {
  const { levelId, categoryId, testId } = useParams();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        setLoading(true);
        // This is the final, specific path to the test document
        const docRef = doc(db, 'practice-test', levelId, categoryId, testId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTestData(docSnap.data());
        } else {
          setError('Test not found.');
        }
      } catch (err) {
        setError('Failed to load test: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [levelId, categoryId, testId]);

  if (loading) return <div className="loading">Loading Test...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!testData) return null;

  return (
    <div className="practice-test-container">
      <button onClick={() => navigate(-1)} className="back-button" >
        &larr; Back to Test List
      </button>
      <h1>{testData.title}</h1>
      
      {testData.contentBlocks && testData.contentBlocks.map((block, index) => {
        // Use the index as a key
        switch (block.type) {
          case 'section-header':
            return <SectionHeader key={index} text={block.text} />;
          case 'audio':
            return <AudioPlayer key={index} src={block.src} />;
          case 'passage':
            return <Passage key={index} htmlContent={block.htmlContent} />;
          case 'image':
            return <ImageDisplay key={index} src={block.src} />;
          case 'question':
            return <Question key={index} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default TestTakerPage;