import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { Question } from '../types/questions';
import { logger } from '../../../utils/logger';

export const useStandardQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchStandardQuestions = async () => {
      try {
        logger.debug('Fetching standard questions...');
        const questionsRef = collection(db, 'questions');
        const standardQuery = query(questionsRef, where('requiredForOnboarding', '==', true));
        const snapshot = await getDocs(standardQuery);
        
        logger.debug('Standard questions query result:', { 
          empty: snapshot.empty,
          size: snapshot.size,
          docs: snapshot.docs.map(d => d.id)
        });

        const fetchedQuestions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Question[];

        setQuestions(fetchedQuestions);
        logger.debug('Fetched standard questions:', { 
          count: fetchedQuestions.length,
          questions: fetchedQuestions.map(q => ({id: q.id, type: q.type}))
        });
      } catch (error) {
        logger.error('Error fetching standard questions:', error);
        setQuestions([]);
      }
    };

    fetchStandardQuestions();
  }, []);

  return questions;
};

export const useQuestionPool = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchPoolQuestions = async () => {
      try {
        logger.debug('Fetching pool questions...');
        const questionsRef = collection(db, 'questions');
        const poolQuery = query(questionsRef, where('includeInOnboarding', '==', true));
        const snapshot = await getDocs(poolQuery);
        
        logger.debug('Pool questions query result:', { 
          empty: snapshot.empty,
          size: snapshot.size,
          docs: snapshot.docs.map(d => d.id)
        });

        const fetchedQuestions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Question[];

        setQuestions(fetchedQuestions);
        logger.debug('Fetched pool questions:', { 
          count: fetchedQuestions.length,
          questions: fetchedQuestions.map(q => ({id: q.id, type: q.type}))
        });
      } catch (error) {
        logger.error('Error fetching pool questions:', error);
        setQuestions([]);
      }
    };

    fetchPoolQuestions();
  }, []);

  return questions;
}; 