import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

import { db } from "../firebaseConfig.js";

const PracticeTestListPage = () => {
  const { levelId, categoryId } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a clean title from the categoryId
  const categoryTitle = categoryId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  useEffect(() => {
    const fetchTestList = async () => {
      try {
        setLoading(true);
        const testsColRef = collection(db, 'practice-test', levelId, categoryId);
        // Order tests by their ID (which is the slug, e.g., N3-202412-1)
        const q = query(testsColRef, orderBy('title', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const testList = [];
        querySnapshot.forEach((doc) => {
          testList.push({
            id: doc.id, // e.g., "N3-202412-1"
            title: doc.data().title // e.g., "N3 Vocabulary Test (2024-12-1)"
          });
        });
        
        setTests(testList);
      } catch (err) {
        setError('Failed to load test list: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestList();
  }, [levelId, categoryId]);

  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    // We reuse your layout and title classes
    <div className="list-container">
      <button onClick={() => navigate(-1)} className="back-button" >
        &larr; Back to Categories
      </button>
      <h1 className="category-title">{levelId.toUpperCase()} {categoryTitle}</h1>
      
      {/* These styles are new and in the app_style.css file */}
      <ul className="test-list">
        {tests.length === 0 && <p>No tests found for this category.</p>}
        
        {tests.map(test => (
          <li key={test.id}>
            <Link to={`/level/${levelId}/practice-test/${categoryId}/${test.id}`}>
              {test.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticeTestListPage;