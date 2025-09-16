// src/components/ExerciseListPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

const ExerciseListPage = () => {
  const { level, category } = useParams();
  const [exercises, setExercises] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // New state for the total count
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseData = async () => {
      setLoading(true);
      try {
        // 1. Fetch the metadata document to get the total count
        const metadataRef = doc(db, 'jlpt', level, category, '--metadata--');
        const metadataSnap = await getDoc(metadataRef);
        if (metadataSnap.exists()) {
          setTotalCount(metadataSnap.data().totalExercises);
        }

        // 2. Fetch all the individual exercise documents to build the grid
        const exerciseCollectionRef = collection(db, 'jlpt', level, category);
        const querySnapshot = await getDocs(exerciseCollectionRef);
        
        // Filter out the metadata document from the list of exercises
        const exercisesData = querySnapshot.docs
          .filter(doc => doc.id !== '--metadata--')
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
        
        exercisesData.sort((a, b) => a.exercise - b.exercise);
        setExercises(exercisesData);

      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseData();
  }, [level, category]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="exercise-list-container">
      <div className="exercise-list-header">
        <Link to={`/levels/${level}/${category}`} className="back-to-levels-button">
          ← Back
        </Link>
        {/* 3. Display the total count in the title */}
        <h1 className="exercise-list-title">
          {level.toUpperCase()} {category} 
          <span>({totalCount > 0 ? `${totalCount} Exercises` : 'No Exercises Found'})</span>
        </h1>
      </div>
      
      {exercises.length > 0 ? (
        <div className="exercise-grid">
          {exercises.map((exercise) => (
            <Link key={exercise.id} to={`/quiz/${exercise.id}`} className="exercise-card">
              {exercise.exercise}
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty-state-text">
          Please run the web scraper in GitHub Actions to populate the database.
        </p>
      )}
    </div>
  );
};

export default ExerciseListPage;