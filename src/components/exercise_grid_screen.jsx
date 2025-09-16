// src/components/ExerciseListPage/ExerciseListPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ExerciseListPage = () => {
  const { level, category } = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const docIdPrefix = `${level}-${category}-exercise-`;
        const q = query(
          collection(db, 'quizzes'),
          where('level', '==', level),
          where('category', '==', category)
        );
        
        const querySnapshot = await getDocs(q);
        const exercisesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          number: doc.id.replace(docIdPrefix, ''),
        }));
        
        exercisesData.sort((a, b) => a.number - b.number);
        setExercises(exercisesData);

      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [level, category]);

  if (loading) {
    // Use the themed loader
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="exercise-list-container">
      <div className="exercise-list-header">
        <h1 className="exercise-list-title">
          {level.toUpperCase()} {category} Exercises
        </h1>
      </div>
      
      {exercises.length > 0 ? (
        <div className="exercise-grid">
          {exercises.map((exercise) => (
            <Link
              key={exercise.id}
              to={`/quiz/${level}/${category}/${exercise.number}`}
              className="exercise-card"
            >
              {exercise.number}
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty-state-text">
          No exercises found. Please run the web scraper to populate the database.
        </p>
      )}
    </div>
  );
};

export default ExerciseListPage;